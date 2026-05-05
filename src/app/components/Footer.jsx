import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0c] text-white pt-16 pb-8 px-6 lg:px-24 border-t border-gray-800/30 relative overflow-hidden">
            {/* ব্যাকগ্রাউন্ডে হালকা গ্লো ইফেক্ট */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">

                    {/* ১. ব্র্যান্ডিং এবং বর্ণনা */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent italic">
                            Md. Morsalin
                        </h2>
                        <p className="text-gray-400 leading-relaxed max-w-xs">
                            A passionate Web Developer specializing in the MERN stack. Crafting digital experiences with precision and modern UI aesthetics.
                        </p>
                    </div>

                    {/* ২. কুইক লিঙ্কস */}
                    <div className="md:ml-auto">
                        <h3 className="text-lg font-semibold mb-6 text-gray-100 uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-purple-400 transition-all duration-300 flex items-center gap-2"><span>&rsaquo;</span> Home</a></li>
                            <li><a href="#about" className="hover:text-purple-400 transition-all duration-300 flex items-center gap-2"><span>&rsaquo;</span> About</a></li>
                            <li><a href="#projects" className="hover:text-purple-400 transition-all duration-300 flex items-center gap-2"><span>&rsaquo;</span> Projects</a></li>
                            <li><a href="#contact" className="hover:text-purple-400 transition-all duration-300 flex items-center gap-2"><span>&rsaquo;</span> Contact</a></li>
                        </ul>
                    </div>

                    {/* ৩. সোশ্যাল কানেকশন */}
                    <div className="md:ml-auto text-left md:text-right">
                        <h3 className="text-lg font-semibold mb-6 text-gray-100 uppercase tracking-wider">Connect With Me</h3>
                        <div className="flex gap-4 justify-start md:justify-end">
                            {[
                                { icon: <FaGithub />, link: "https://github.com/md-morsalin10", color: "hover:bg-gray-800" },
                                { icon: <FaLinkedin />, link: "#", color: "hover:bg-blue-600" },
                                { icon: <FaFacebook />, link: "#", color: "hover:bg-blue-700" },
                                { icon: <FaEnvelope />, link: "mailto:your-email@example.com", color: "hover:bg-purple-600" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    className={`p-3 bg-gray-900/50 rounded-xl text-xl text-gray-300 border border-gray-800 transition-all duration-300 ${social.color} hover:text-white hover:-translate-y-1`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* কপিরাইট */}
                <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} morsalin.dev — All rights reserved.</p>
                    <p className="flex items-center gap-1">Built with <span className="text-pink-500">♥</span> using Next.js</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;