import React from 'react';

const AboutUs = () => {
    return (
        <section id="about" className="py-16 bg-pink-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 mb-10 lg:mb-0">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-200 rounded-full opacity-50"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
                            <img
                                src="/images/bubble-tea-shop.png"
                                alt="Sips and Sweets Shop"
                                className="relative z-10 rounded-lg shadow-lg w-full"
                            />
                        </div>
                    </div>

                    <div className="lg:w-1/2 lg:pl-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                            Our <span className="text-pink-600">Story</span>
                        </h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Sips & Sweets was born from a passion for creating delightful bubble tea experiences.
                            What started as a small family operation in 2018 has grown into a beloved destination
                            for tea enthusiasts and sweet-tooths alike.
                        </p>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We pride ourselves on using only the freshest ingredients, brewing our teas daily,
                            and making our boba pearls from scratch. Every drink and treat is crafted with care,
                            ensuring that perfect balance of flavors that keeps our customers coming back.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <div className="text-pink-600 text-3xl font-bold mb-2">100%</div>
                                <div className="text-gray-700">Fresh Ingredients</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <div className="text-pink-600 text-3xl font-bold mb-2">50+</div>
                                <div className="text-gray-700">Unique Flavors</div>
                            </div>
                        </div>

                        <a
                            href="#contact"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:opacity-90 transition shadow-md"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
