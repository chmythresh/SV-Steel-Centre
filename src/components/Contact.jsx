import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = '919246473280';

export default function Contact() {
  const [form, setForm] = useState({ name: '', mobile: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Sri Venkateswara Steel Centre, my name is ${form.name || '[Name]'}. Mobile: ${form.mobile || '[Mobile]'}.\nMessage: ${form.message || 'I would like to inquire about steel sheets.'}`
  )}`;

  return (
    <section className="bg-white py-16 lg:py-24" id="contact" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-[#49607e] uppercase tracking-widest block mb-2">
            Get In Touch
          </span>
          <h2 id="contact-heading" className="font-heading text-3xl lg:text-4xl font-extrabold text-[#0e1c2f] mb-3">
            Sales Depot &amp; Yard Location
          </h2>
          <p className="text-[#44474d] max-w-lg mx-auto text-sm leading-relaxed">
            Visit our Bhavanipuram iron stockyard or send us a message on WhatsApp for immediate tonnage rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info cards (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-4 p-5 border border-[#dee8ff] rounded-2xl bg-[#f0f3ff]">
              <div className="w-10 h-10 rounded-xl bg-[#101d32] text-white flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0e1c2f] mb-1">Depot Address</h4>
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                  Sri Venkateswara Steel Centre<br />
                  Main Road, Bhavanipuram, Vijayawada<br />
                  Andhra Pradesh – 520012, India
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 border border-[#dee8ff] rounded-2xl bg-[#f0f3ff]">
              <div className="w-10 h-10 rounded-xl bg-[#101d32] text-white flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0e1c2f] mb-1">Phone &amp; Direct Sales</h4>
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                  +91 92464 73280<br />
                  Direct Yard Dispatch Desk
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 border border-[#dee8ff] rounded-2xl bg-[#f0f3ff]">
              <div className="w-10 h-10 rounded-xl bg-[#101d32] text-white flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0e1c2f] mb-1">Yard Operating Hours</h4>
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                  Monday – Saturday: 9:00 AM – 8:00 PM<br />
                  Sunday: Closed (Emergency dispatches on call)
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello SV Steel Centre, I need a quote for steel sheets.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all"
            >
              <MessageCircle size={18} />
              <span>Connect on WhatsApp (+91 92464 73280)</span>
            </a>
          </div>

          {/* Form (3 cols) */}
          <div className="lg:col-span-3 bg-[#f9f9ff] p-6 sm:p-8 rounded-2xl border border-[#dee8ff] shadow-sm">
            <h3 className="font-heading text-lg font-bold text-[#0e1c2f] mb-4">
              Send an Instant RFQ / Enquiry
            </h3>

            {sent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                <h4 className="font-heading font-bold text-emerald-900 text-base">Enquiry Generated!</h4>
                <p className="text-xs text-emerald-700">
                  Click below to dispatch your details directly to our WhatsApp sales desk:
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all"
                >
                  <MessageCircle size={16} />
                  <span>Send to WhatsApp Now</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#44474d] uppercase block mb-1">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar / Sri Krishna Fabricators"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#dee8ff] text-sm text-[#0e1c2f] outline-none focus:border-blue-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#44474d] uppercase block mb-1">
                    Mobile Number (WhatsApp Preferred)
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="e.g. +91 98481 XXXXX"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#dee8ff] text-sm text-[#0e1c2f] outline-none focus:border-blue-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#44474d] uppercase block mb-1">
                    Requirement Details (Grade, Gauge, Sheets, Tonnage)
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="e.g. Need 50 sheets of 1.20mm CR Sheets 4x8 ft and 20 sheets of 0.80mm GI Sheets. Please provide rate per kg and delivery schedule."
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#dee8ff] text-sm text-[#0e1c2f] outline-none focus:border-blue-700 resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#101d32] hover:bg-[#1a2d4c] text-white font-bold text-sm shadow transition-all"
                  >
                    <Send size={16} />
                    <span>Generate Enquiry</span>
                  </button>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow transition-all"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
