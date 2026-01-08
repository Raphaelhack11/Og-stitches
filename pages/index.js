import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// --- CONFIGURATION ---
const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

const products = [
  { id: 1, name: "Signature White Senator", price: 35000, image: "https://i.imgur.com/AxhTo9F.jpeg" },
  { id: 2, name: "Classic Black Kaftan", price: 35000, image: "https://i.imgur.com/Ka76BKP.jpeg" },
  { id: 3, name: "Premium Blue Suite", price: 40000, image: "https://i.imgur.com/9aMZF4t.jpeg" },
  { id: 4, name: "Traditional Agbada", price: 55000, image: "https://i.imgur.com/olKCouS.jpeg" },
  { id: 5, name: "Corporate Native Wear", price: 30000, image: "https://i.imgur.com/BUnK70e.jpeg" },
  { id: 6, name: "Luxury Embroidered Top", price: 32000, image: "https://i.imgur.com/zKqnwSn.jpeg" },
  { id: 7, name: "Modern Short Sleeve Native", price: 25000, image: "https://i.imgur.com/CUUa81w.jpeg" },
  { id: 8, name: "Royal Gold Detail Fit", price: 45000, image: "https://i.imgur.com/jg87N80.jpeg" },
  { id: 9, name: "Executive Grey Senator", price: 35000, image: "https://i.imgur.com/7x625pM.jpeg" },
  { id: 10, name: "Patterned Cultural Wear", price: 38000, image: "https://i.imgur.com/7wA7oe2.jpeg" },
  { id: 11, name: "Deep Wine Senator", price: 35000, image: "https://i.imgur.com/K7xIGdi.jpeg" },
  { id: 12, name: "Sky Blue Daily Wear", price: 28000, image: "https://i.imgur.com/1LLbsPf.jpeg" },
  { id: 13, name: "Midnight Navy Suit", price: 42000, image: "https://i.imgur.com/0mCFg3E.jpeg" },
  { id: 14, name: "Cream Wedding Guest Fit", price: 35000, image: "https://i.imgur.com/p4xNpYP.jpeg" },
  { id: 15, name: "Bold Stripe Native", price: 30000, image: "https://i.imgur.com/SpgPY3X.jpeg" },
  { id: 16, name: "Urban Style Kaftan", price: 33000, image: "https://i.imgur.com/NOahIb4.jpeg" },
  { id: 17, name: "Bespoke Masterpiece", price: 50000, image: "https://i.imgur.com/FQJl52V.jpeg" },
];

export default function OGStitches() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', number: '', address: '', age: '', sex: '', qty: 1 });

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading('Sending booking to OG Stitches...');

    const message = `
🇳🇬 *NEW ORDER: OG STITCHES*
--------------------------
*Item:* ${selectedProduct.name}
*Quantity:* ${formData.qty}
*Total:* ₦${(selectedProduct.price * formData.qty).toLocaleString()}

*Client Details:*
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.number}
🏠 *Address:* ${formData.address}
🎂 *Age:* ${formData.age}
🚻 *Sex:* ${formData.sex}
--------------------------
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (response.ok) {
        toast.success('Successfully Scheduled!', { id: loadingToast });
        setSelectedProduct(null);
        setFormData({ name: '', number: '', address: '', age: '', sex: '', qty: 1 });
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Error sending message. Please try WhatsApp.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-black selection:bg-black selection:text-white">
      <Toaster position="top-center" />

      {/* Navigation & Logo */}
      <nav className="border-b border-gray-100 p-6 flex flex-col items-center sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <img 
          src="https://i.imgur.com/79M6m9E.png" 
          alt="OG Stitches Logo" 
          className="h-24 w-auto mb-4" 
        />
        <div className="flex space-x-8 text-[11px] font-black uppercase tracking-[0.3em]">
          <a href="#shop" className="hover:text-amber-600 transition">Collection</a>
          <a href="#about" className="hover:text-amber-600 transition">Our Story</a>
          <a href="#contact" className="hover:text-amber-600 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl md:text-8xl font-serif mb-6 tracking-tighter italic">Elegance in Every Stitch.</h1>
        <p className="max-w-xl mx-auto text-gray-400 text-[10px] uppercase tracking-[0.5em] leading-relaxed">
          Premium Bespoke Tailoring | Badagry, Lagos
        </p>
      </section>

      {/* Product Grid */}
      <main id="shop" className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
        {products.map((item) => (
          <div key={item.id} className="group">
            <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative mb-6 shadow-sm">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-bold tracking-widest">
                ₦{item.price.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3">{item.name}</h3>
              <button 
                onClick={() => setSelectedProduct(item)}
                className="inline-block bg-black text-white text-[10px] px-8 py-3 uppercase font-black tracking-widest hover:bg-amber-700 transition duration-300"
              >
                Secure This Fit
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* About Section */}
      <section id="about" className="my-24 py-24 bg-stone-50 border-y border-stone-100 text-center px-6">
        <h2 className="text-3xl font-serif mb-8 italic">The Brand</h2>
        <p className="max-w-2xl mx-auto text-stone-500 text-sm leading-loose tracking-wide">
          OG Stitches is a premier fashion house located at No. 2 Peu Street, Badagry. 
          We specialize in high-end native wears, corporate suits, and bespoke senators 
          designed to command respect. Every garment is a masterpiece, crafted with 
          precision and a deep respect for African heritage.
        </p>
      </section>

      {/* Booking Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-8 relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-6 text-3xl font-light">✕</button>
            
            <h2 className="text-2xl font-serif mb-1 italic">Order Summary</h2>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-8 border-b pb-4">Style: {selectedProduct.name}</p>

            <form onSubmit={handleBooking} className="space-y-4">
              <input type="text" placeholder="Full Name" required className="w-full border-b border-gray-100 py-3 outline-none focus:border-black text-sm" onChange={e => setFormData({...formData, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="tel" placeholder="Phone" required className="w-full border-b border-gray-100 py-3 outline-none focus:border-black text-sm" onChange={e => setFormData({...formData, number: e.target.value})} />
                <input type="number" placeholder="Age" required className="w-full border-b border-gray-100 py-3 outline-none focus:border-black text-sm" onChange={e => setFormData({...formData, age: e.target.value})} />
              </div>
              <select className="w-full border-b border-gray-100 py-3 outline-none bg-transparent text-sm" required onChange={e => setFormData({...formData, sex: e.target.value})}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input type="text" placeholder="Delivery Address" required className="w-full border-b border-gray-100 py-3 outline-none focus:border-black text-sm" onChange={e => setFormData({...formData, address: e.target.value})} />
              
              <div className="flex items-center justify-between py-4 border-b border-gray-50">
                <span className="text-[10px] font-bold uppercase tracking-widest">Quantity</span>
                <div className="flex items-center gap-6">
                  <button type="button" className="text-xl" onClick={() => setFormData({...formData, qty: Math.max(1, formData.qty - 1)})}>—</button>
                  <span className="font-bold">{formData.qty}</span>
                  <button type="button" className="text-xl" onClick={() => setFormData({...formData, qty: formData.qty + 1})}>＋</button>
                </div>
              </div>

              <div className="flex justify-between items-center py-6">
                <span className="text-[10px] font-bold uppercase text-stone-400">Total Price</span>
                <span className="text-2xl font-black italic">₦{(selectedProduct.price * formData.qty).toLocaleString()}</span>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-black text-white w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-stone-800 transition"
              >
                {isSubmitting ? 'Processing...' : 'Schedule Now'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="py-20 px-6 border-t border-gray-50 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div>
            <h4 className="font-serif text-2xl italic mb-6">OG Stitches</h4>
            <p className="text-stone-400 text-xs leading-loose tracking-widest">NO. 2 PEU STREET, BADAGRY, LAGOS STATE.</p>
          </div>
          
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">Inquiries</h5>
            <p className="text-sm font-light">Call: 09116921537</p>
            <p className="text-sm font-light">WhatsApp: 07045617191</p>
            <p className="text-sm font-light">ezunraphael53@gmail.com</p>
          </div>

          <div className="flex flex-col gap-4">
             <a href="https://wa.me/2347045617191" className="bg-white text-black px-8 py-4 text-center text-[10px] font-black uppercase tracking-widest hover:bg-stone-200 transition">Contact via WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
