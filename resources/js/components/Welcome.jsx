
import React from 'react';
const Welcome = () => {
    return (
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 mb-10 lg:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Welcome to <span className="text-pink-600">Sips & Sweets</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Indulge in our delicious bubble teas, fruit teas, and sweet treats.
                            Made with fresh ingredients and lots of love!
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#menu"
                                className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition shadow-md"
                            >
                                Explore Menu
                            </a>
                            <a
                                href="#contact"
                                className="px-6 py-3 bg-white text-pink-600 border border-pink-600 rounded-full hover:bg-pink-50 transition shadow-md"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-200 rounded-full opacity-50"></div>
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-pink-300 rounded-full opacity-50"></div>
                        <div className="relative bg-transparent p-4 rounded-lg shadow-xl">
                            <img
                                src="/images/welcomeimg.png"
                                alt="Colorful bubble tea selection"
                                className="rounded-lg w-full h-auto object-cover"
                                style={{ minHeight: '300px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Welcome;
