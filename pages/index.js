import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// --- CONFIGURATION ---
// Replace these with your actual details from @BotFather and @userinfobot
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

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
🇳🇬 *NEW APPOINTMENT: OG STITCHES*
--------------------------
*Item:* ${selectedProduct.name}
*Quantity:* ${formData.qty}
*Total:* ₦${(selectedProduct.price * formData.qty).toLocaleString()}

*Client Information:*
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
        toast.success('Successfully Scheduled! We will contact you.', { id: loadingToast });
        setSelectedProduct(null);
        setFormData({ name: '', number: '', address: '', age: '', sex: '', qty: 1 });
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Error sending message. Check your internet.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-black selection:bg-black selection:text-white">
      <Toaster position="top-center" />

      {/* Navigation */}
      <nav className="border-b border-gray-100 p-5 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="text-2xl font-black tracking-tighter">OG STITCHES</div>
        <div className="hidden md:flex space-x-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          <a href="#shop" className="hover:opacity-50 transition">Collection</a>
          <a href="#about" className="hover:opacity-50 transition">The Brand</a>
          <a href="#contact" className="hover:opacity-50 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 text-center">
        <h1 className="text-7xl md:text-9xl font-serif mb-8 tracking-tighter italic">Defined by Detail.</h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-sm uppercase tracking-[0.3em] leading-relaxed">
          Premium Bespoke Tailoring — No. 2 Peu Street, Badagry.
        </p>
      </section>

      {/* Product Grid */}
      <main id="shop" className="max-w-[1400px] mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((item) => (
          <div key={item.id} className="group cursor-default">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative mb-6">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-[1.5s] ease-out" />
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 text-[11px] font-bold">
                ₦{item.price.toLocaleString()}
              </div>
            </div>
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-bold uppercase tracking-widest">{item.name}</h3>
              <button 
                onClick={() => setSelectedProduct(item)}
                className="text-[10px] uppercase font-black border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition"
              >
                Schedule Measurement
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* About Section */}
      <section id="about" className="my-32 py-24 bg-black text-white text-center px-6">
        <h2 className="text-4xl font-serif mb-8 italic">Our Story</h2>
        <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed font-light">
          OG Stitches is more than a fashion house; it is a commitment to excellence. 
          Located in Badagry, Lagos, we specialize in crafting bespoke traditional and contemporary 
          men's wear that fits perfectly and commands respect. Every stitch is handled with professional care.
        </p>
      </section>

      {/* Booking Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-white z-[100] overflow-y-auto flex items-center justify-center p-4 md:p-12">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Modal Image */}
            <div className="hidden md:block h-[600px]">
              <img src={selectedProduct.image} className="w-full h-full object-cover shadow-2xl" alt="Selection" />
            </div>

            {/* Modal Form */}
            <div className="relative">
              <button onClick={() => setSelectedProduct(null)} className="absolute -top-12 right-0 text-4xl font-light hover:rotate-90 transition inline-block">✕</button>
              
              <h2 className="text-3xl font-serif mb-1 italic">Book Measurement</h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">Item: {selectedProduct.name}</p>

              <form onSubmit={handleBooking} className="space-y-5">
                <input type="text" placeholder="Full Name" required className="w-full border-b border-gray-200 py-4 outline-none focus:border-black transition" onChange={e => setFormData({...formData, name: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-6">
                  <input type="tel" placeholder="Phone Number" required className="w-full border-b border-gray-200 py-4 outline-none focus:border-black transition" onChange={e => setFormData({...formData, number: e.target.value})} />
                  <input type="number" placeholder="Age" required className="w-full border-b border-gray-200 py-4 outline-none focus:border-black transition" onChange={e => setFormData({...formData, age: e.target.value})} />
                </div>

                <select className="w-full border-b border-gray-200 py-4 outline-none bg-transparent" required onChange={e => setFormData({...formData, sex: e.target.value})}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <input type="text" placeholder="Shipping/Home Address" required className="w-full border-b border-gray-200 py-4 outline-none focus:border-black transition" onChange={e => setFormData({...formData, address: e.target.value})} />
                
                <div className="flex items-center justify-between py-6">
                  <span className="text-xs font-bold uppercase tracking-tighter">Quantity</span>
                  <div className="flex items-center gap-8">
                    <button type="button" className="text-2xl" onClick={() => setFormData({...formData, qty: Math.max(1, formData.qty - 1)})}>—</button>
                    <span className="font-bold text-xl">{formData.qty}</span>
                    <button type="button" className="text-2xl" onClick={() => setFormData({...formData, qty: formData.qty + 1})}>＋</button>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t border-black">
                  <span className="text-[10px] font-bold uppercase">Estimated Price</span>
                  <span className="text-3xl font-black">₦{(selectedProduct.price * formData.qty).toLocaleString()}</span>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-black text-white w-full py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-gray-800 disabled:bg-gray-200 transition"
                >
                  {isSubmitting ? 'Sending Request...' : 'Schedule Appointment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="py-20 px-6 border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="col-span-1">
            <h4 className="font-black text-2xl mb-4 italic uppercase tracking-tighter">OG Stitches</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">Your trusted partner in high-quality bespoke African attire.</p>
            <div className="flex gap-4">
              <a href="https://wa.me/2347045617191" className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition">
                WhatsApp
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Contact Details</h5>
            <p className="text-sm font-medium leading-loose">📍 No. 2 Peu Street, Badagry, Lagos State</p>
            <p className="text-sm font-medium">📞 09116921537</p>
            <p className="text-sm font-medium underline">📧 ezunraphael53@gmail.com</p>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Operations</h5>
            <p className="text-sm text-gray-500">Monday — Saturday<br />09:00 AM - 06:00 PM</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Global Shipping Available</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
