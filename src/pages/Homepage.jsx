import React from "react";

const Homepage = () => {
  return (
    <div className="bg-gray-100">
      {/* First Section with Background Image */}
      <nav className="bg-black px-4 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-white text-sm font-bold">Signsphere</div>

      {/* Nav Items */}
      <div className="flex space-x-4">
        {["Home", "About", "Services", "Contact"].map((item, index) => (
          <a
            key={index}
            href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
            className="text-white bg-gray-800 px-3 py-1.5 rounded-full text-xs font-medium relative group"
          >
            {/* Border Shine Effect */}
            <span className="absolute inset-0 border-2 border-transparent rounded-full group-hover:border-white group-hover:animate-light transition-all duration-300"></span>
            <span className="relative z-10">{item}</span>
          </a>
        ))}
      </div>
    </nav>
      <section 
        className="py-16 bg-cover bg-center h-[90vh]"
        style={{ backgroundImage: "url('/frontpagebanner_dark.jpg')" }} // Replace with your background image URL
      >
        <div className="relative h-full w-full flex items-end justify-end mt-6">
          <div className="text-white text-right p-8 ">
            {/* <h1 className="text-5xl font-bold leading-tight mb-4">
              Welcome to <span className="text-yellow-400">SignSphere</span>
            </h1> */}
            <p className="text-lg mb-6">Bridging communication gaps with Pakistan Sign Language (PSL).</p>
            <div className="flex justify-end gap-4">
            <a
              href="/interpreter"
              className="flex items-center bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 relative"
            >
              <span>Use Interpreter</span>
              {/* Circular Icon */}
              <span className="flex items-center justify-center bg-white text-blue-500 w-8 h-8 rounded-full shadow-inner ml-3">
                {/* Replace with your desired icon */}
                <img
                  src="tap.png"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                />
                  
              </span>
              {/* Button Text */}
            </a>

            <a
                href="/dictionary"
                className="bg-gray-100 text-gray-800 font-semibold py-2 px-8 rounded-full shadow-lg hover:bg-gray-200 hover:shadow-xl transition duration-300"
              >
                Explore Dictionary
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* Logo Strip Section */}
      <section className="bg-gray-100 py-2 overflow-hidden">
  <div className="relative w-full">
    {/* Light Beam Animation (Wave-like effect) */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-wave-beam"></div>
    
    <div className="container-max relative">
      {/* Scroller with continuous movement */}
      <div className="scroller flex gap-4 overflow-hidden">
        <div className="scroller__inner flex gap-4 animate-scroll">
          {/* Repeat items (like images or boxes) to create a loop */}
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          <div className="w-24 h-1 bg-black rounded-xl shadow-lg"></div>
          
          
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max">
          <h2 className="section-title">Why Choose <span className="text-blue-500">SignSphere?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <img src="real-time.png" alt="Feature 1" className="mx-auto mb-6 h-[3rem] w-[3rem]"/>
              <h3 className="text-xl font-semibold">Real-Time Interpretation</h3>
              <p className="text-gray-600 mt-2">Convert PSL signs into text instantly.</p>
            </div>
            <div className="feature-card">
              <img src="webcam.png" alt="Feature 2" className="mx-auto mb-6 h-[3rem] w-[3rem]"/>
              <h3 className="text-xl font-semibold">Webcam Support</h3>
              <p className="text-gray-600 mt-2">Use your webcam to interact with PSL seamlessly.</p>
            </div>
            <div className="feature-card">
              <img src="dictionary.png" alt="Feature 3" className="mx-auto mb-6 h-[3rem] w-[3rem]"/>
              <h3 className="text-xl font-semibold">PSL Dictionary</h3>
              <p className="text-gray-600 mt-2">A comprehensive PSL dictionary for all users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Model Flow Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max">
          <h2 className="section-title">How SignSphere Works</h2>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2">
              <img src="/Slait_Animation.gif" alt="Flow Diagram" className="rounded-lg shadow-xl h-[60vh] w-[40vw]"/>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left">
              <h3 className="text-xl font-semibold">Understanding the Process</h3>
              <p className="text-gray-600 mt-4">Our AI-powered model interprets Pakistan Sign Language and provides real-time text responses. The model is trained on thousands of gestures and offers accurate translations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Section: Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-max">
          <h2 className="section-title">What Users Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="testimonial-card">
              <p className="text-gray-600">"SignSphere has been a game-changer for communication in the deaf community. It's fast, reliable, and easy to use."</p>
              <p className="text-sm text-gray-500 mt-4">- Aisha Khan</p>
            </div>
            <div className="testimonial-card">
              <p className="text-gray-600">"The real-time translation feature is amazing! I can communicate effectively with my friends who use PSL."</p>
              <p className="text-sm text-gray-500 mt-4">- Ali Ahmed</p>
            </div>
            <div className="testimonial-card">
              <p className="text-gray-600">"I love the PSL Dictionary. It's been so helpful for learning and practicing signs."</p>
              <p className="text-sm text-gray-500 mt-4">- Maria Khan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Section: How to Get Started */}
      <section className="py-16 bg-gray-100">
        <div className="container-max text-center">
          <h2 className="section-title">Getting Started with SignSphere</h2>
          <p className="text-lg mt-4">Ready to start using SignSphere? Follow these simple steps:</p>
          <div className="mt-8">
            <ol className="list-decimal text-left">
              <li>Visit the <a href="/interpreter" className="text-blue-500">interpreter</a> page to start translating PSL.</li>
              <li>Check out our <a href="/dictionary" className="text-blue-500">PSL Dictionary</a> for more signs.</li>
              <li>Learn more about how we work on the <a href="/about" className="text-blue-500">About</a> page.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-max text-center">
          <p>&copy; 2024 SignSphere. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
