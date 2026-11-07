import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#101D32] flex flex-col items-center justify-center text-center px-4">
            {/* Large 404 number */}
            <p className="text-[10rem] sm:text-[14rem] font-heading font-extrabold text-white/5 select-none leading-none mb-0">
                404
            </p>
            <div className="-mt-12 relative z-10">
                <h1 className="text-3xl lg:text-4xl font-heading font-extrabold text-white mb-3">
                    Page Not Found
                </h1>
                <p className="text-[#B9C4D0] text-sm max-w-sm mx-auto leading-relaxed mb-8">
                    The page you are looking for does not exist or has been moved. Please navigate back to the home page.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30">
                        <Home size={15} /> Back to Home
                    </Link>
                    <Link to="/contact"
                        className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-xl text-sm transition-all duration-200">
                        <ArrowLeft size={15} /> Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
