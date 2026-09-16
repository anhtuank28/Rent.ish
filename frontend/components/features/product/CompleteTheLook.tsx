import React from 'react';

const ACCESSORIES = [
  {
    id: 1,
    brand: 'Cult Gaia',
    name: 'Túi Trúc Acrylic',
    price: 18,
    retailPrice: 398,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5btY3PI1dtvQjhvW-kL-gRPfcj4ZvpC4dWam3HbHpWbzprkACLcya5yltWmYsSfH7Lq1ZaS_fHZa9yOoBErcqAIMzQA9pbf9mcRxTOOeStkVY-oHE7Bzidaj62Jo0S4EIQK-lVb4x4nR-B5NHfQ7AOUxB172MG8A690Iag4AarO3-FhTqDGR5j7oSPQ6tZaBzb6QkUss_krc5qO-yNC5RNfuhxHwhSwjBi8FKnqFWapri5x1gZ0N76Q'
  },
  {
    id: 2,
    brand: 'Sophie Buhai',
    name: 'Khuyên Tai Ngọc Trai',
    price: 12,
    retailPrice: 275,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAizNd3HYJyp7KF_I1ZhX2pp2ZAb4G0GCn_9lbN5Kzkc5Z6oDRkI16WJEY9UPlwJkmq5O80_-_Xg6vNuIII-FTXx9d5BKN6yvsJ-Rvyjo6Jr_nn3mzU8nbB8noPablB0Ur2GmyDeWfbrZ6jXZoRBUz5mt2JZ6h1X9aasQVscSHXhB7xV8WG6guE9dhUoW5rTYnSKovb9eCGtvKCoJoM60_uQQzm9R1SmKY9NvPQPrGIsA_zI1bFsQlkYg'
  },
  {
    id: 3,
    brand: 'Khaite',
    name: 'Khăn Choàng Lụa',
    price: 15,
    retailPrice: 320,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG71a9gfjzuUoj5rgV9G_jadrmZsGBQmBCkcP2wpLqrRPJOM5FehhEF20DYQIh5nnWSAhpGUCnxlcFiE_0KZPdU8z4li3xqvTnza4gOUATgKlTFba4gmt35uwJ8MprAuIZ_yGeXW7UXb2HFmHx8yBhEadpVVXu0e8-C9KnR3doGSnw1uPqSVhfw_nB9UxXY3_uv-jbxg8-AMqbLsp_zfCGJFhJm8N_qmyZzXRj0H3u2mxC6w65_5Pwbw'
  },
  {
    id: 4,
    brand: 'Manolo Blahnik',
    name: 'Giày Mules Satin',
    price: 24,
    retailPrice: 795,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlDRcXQ3y5lJcEtoCZLa0PDbhP2K2sgmHtM6TdBQxVPpAqeQhv4rsM2JpL1KwO6CEpz4taSuk0KljRYnY896U_inzAv01Nvzem1t8h36d51OUaZIBboY37BlWKgWeTH4MlbrYt4FoDhT4LI77rRkQ92aw5L_2JRQq6hAu3G2kCPwPOlkZuA3Tqvef4X0upcKR5y0lY0jb8I9s7ySf4KCLm_ug5ch1kZAHfBYgBXbr_xWaMmYhPh5LfQg'
  }
];

export function CompleteTheLook() {
  return (
    <section className="w-full max-w-7xl mx-auto px-margin-sm md:px-margin lg:px-margin-lg py-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-2">
        <div>
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
            Gợi Ý Phối Đồ
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Hoàn Thiện Diện Mạo
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Thuê thêm phụ kiện hàng hiệu với giá ưu đãi khi thuê kèm đầm
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Scroll left" className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors" type="button">
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button aria-label="Scroll right" className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors" type="button">
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {ACCESSORIES.map(item => (
          <div key={item.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)] group flex flex-col justify-between p-space-md">
            <div className="aspect-square rounded-DEFAULT overflow-hidden bg-surface-container relative mb-space-md">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full font-label-sm text-[11px] font-semibold text-on-surface">
                {item.brand}
              </span>
            </div>
            <div className="space-y-1">
              <h4 className="font-headline-sm text-[17px] leading-snug text-on-surface font-semibold">
                {item.name}
              </h4>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="font-label-lg text-label-lg font-bold text-on-surface">{item.price}K</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant"> / 4 ngày</span>
                </div>
                <span className="font-body-sm text-[12px] text-outline line-through">Gốc {item.retailPrice}K</span>
              </div>
            </div>
            <button className="mt-3 w-full py-2 rounded-full bg-surface-container-low hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors flex items-center justify-center gap-1" type="button">
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Thêm vào túi thuê</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
