"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

// Dùng đường dẫn tương đối để đi qua Cổng Proxy của Next.js (next.config.ts)
const API_URL = '';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    setPasswordStrength(score);
  };

  const strengthLabels = ['Yếu', 'Trung bình', 'Khá', 'Mạnh', 'Rất mạnh'];
  const strengthColors = [
    'bg-surface-container-high',
    'bg-error',
    'bg-amber-500',
    'bg-primary',
    'bg-emerald-500'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Tách Họ và Tên
    const nameParts = fullName.trim().split(' ');
    const first_name = nameParts.slice(0, -1).join(' ') || nameParts[0];
    const last_name = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, first_name, last_name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        return;
      }

      // Đăng ký thành công → Chuyển sang trang Login
      router.push(`/login?registered=true${redirectUrl ? `&redirect=${encodeURIComponent(redirectUrl)}` : ''}`);
    } catch {
      setError('Không thể kết nối đến server. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_20px_50px_-12px_rgba(36,30,26,0.08),0_2px_8px_0_rgba(36,30,26,0.03)] overflow-hidden p-6 sm:p-10">
        
        {/* Top Bar Navigation & Brand Title */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Rent-ish Logo"
              width={142}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <Link
            className="inline-flex items-center gap-1.5 text-secondary hover:text-on-surface font-label-md text-label-md transition-colors duration-200 group"
            href="/"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
            Trở về
          </Link>
        </div>

        {/* Tab Switcher (Navigation instead of state) */}
        <div className="p-1 bg-surface-container rounded-full flex items-center mb-7 w-full">
          <Link
            href={`/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
            className="flex-1 py-2.5 px-4 rounded-full font-label-lg text-label-lg text-center text-secondary hover:text-on-surface transition-colors"
          >
            Đăng Nhập
          </Link>
          <div className="flex-1 py-2.5 px-4 rounded-full font-label-lg text-label-lg text-center bg-primary-container text-on-primary-container shadow-sm">
            Đăng Ký
          </div>
        </div>

        {/* 1-Click Social Logins */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 w-full">
          <button className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all duration-200 shadow-sm active:scale-[0.99]" type="button">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
              <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
              <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z" fill="#FBBC05"></path>
              <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
            </svg>
            <span>Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all duration-200 shadow-sm active:scale-[0.99]" type="button">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.65-.79 1.1-1.9 0.98-3.01-.97.04-2.14.65-2.83 1.44-.61.7-.1.14 1.85-.99 2.98.02 1.09.01 2.14-.64 2.84z"></path>
            </svg>
            <span>Apple</span>
          </button>
        </div>

        {/* Divider with Label */}
        <div className="relative flex items-center justify-center my-6 w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-surface-container-high"></div>
          </div>
          <span className="relative px-3 bg-surface-container-lowest text-secondary font-label-sm text-label-sm uppercase tracking-wider">
            hoặc tiếp tục với email
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-error-container/20 border border-error/30 text-error font-body-sm text-body-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form 2: CREATE ACCOUNT PANEL */}
        <div className="w-full animate-in fade-in">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="signup-name">
                Họ và tên
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-secondary text-[20px] pointer-events-none">person</span>
                <input
                  className="w-full h-12 pl-11 pr-4 bg-surface-container-low focus:bg-surface-container-lowest rounded-DEFAULT text-on-surface font-body-md text-body-md placeholder:text-outline/60 outline-none transition-all duration-200 focus:shadow-[0_0_0_2px_#dfc1aa]"
                  id="signup-name"
                  placeholder="Nguyễn Văn A"
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="signup-email">
                Địa chỉ Email
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-secondary text-[20px] pointer-events-none">email</span>
                <input
                  className="w-full h-12 pl-11 pr-4 bg-surface-container-low focus:bg-surface-container-lowest rounded-DEFAULT text-on-surface font-body-md text-body-md placeholder:text-outline/60 outline-none transition-all duration-200 focus:shadow-[0_0_0_2px_#dfc1aa]"
                  id="signup-email"
                  placeholder="name@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="signup-password">
                Tạo Mật khẩu
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-secondary text-[20px] pointer-events-none">lock</span>
                <input
                  className="w-full h-12 pl-11 pr-11 bg-surface-container-low focus:bg-surface-container-lowest rounded-DEFAULT text-on-surface font-body-md text-body-md placeholder:text-outline/60 outline-none transition-all duration-200 focus:shadow-[0_0_0_2px_#dfc1aa]"
                  id="signup-password"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Ít nhất 8 ký tự"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                />
                <button
                  className="absolute right-3.5 text-secondary hover:text-on-surface p-1 rounded-full transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              
              {/* Interactive Password Strength Meter */}
              <div className="pt-1 space-y-1">
                <div className="grid grid-cols-4 gap-1.5 h-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-full rounded-full transition-colors duration-300 ${
                        passwordStrength >= level ? strengthColors[passwordStrength] : 'bg-surface-container-high'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between font-label-sm text-label-sm text-secondary">
                  <span>
                    Độ mạnh: <strong className="text-on-surface font-semibold">{strengthLabels[passwordStrength]}</strong>
                  </span>
                  <span>Dùng 8+ ký tự, chữ & số</span>
                </div>
              </div>
            </div>
            
            {/* Welcome Perk Banner */}
            <div className="p-3.5 rounded-DEFAULT bg-secondary-fixed/50 flex items-center justify-between gap-3 shadow-sm mt-4">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-tertiary text-[22px]">auto_awesome</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Giảm 15% Đơn Đầu Tiên</span>
                  <span className="font-label-sm text-label-sm text-secondary">Áp dụng mã ở bước thanh toán</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold tracking-wider">
                FIRSTLOOK15
              </span>
            </div>
            
            <button
              className="w-full h-12 rounded-full bg-primary-container hover:bg-inverse-primary text-on-primary-fixed font-label-lg text-label-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <span>Tạo Tài Khoản</span>
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Bottom Micro-copy & Trust Badges */}
        <div className="mt-8 pt-6 border-t border-surface-container w-full text-center space-y-3">
          <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
            Bằng việc tiếp tục, bạn đồng ý với
            <Link className="text-on-surface underline hover:text-tertiary mx-1" href="#">Điều Khoản Dịch Vụ</Link>
            và
            <Link className="text-on-surface underline hover:text-tertiary ml-1" href="#">Chính Sách Cho Thuê</Link>
            của Rent-ish.
          </p>
          <div className="flex items-center justify-center gap-4 text-secondary font-label-sm text-label-sm">
            <span className="inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-tertiary">lock</span>
              Mã Hóa 256-Bit SSL
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span className="inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-tertiary">verified_user</span>
              Bảo Mật Tuyệt Đối
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}

