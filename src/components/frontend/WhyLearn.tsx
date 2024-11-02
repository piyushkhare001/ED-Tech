// components/WhyLearn.tsx

const WhyLearn = () => {
    return (
      <section className="flex flex-col md:flex-row items-center m-8 ml-24">
        {/* Text Section */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold">Why Learn this course?</h2>
  
          <div>
            <h3 className="text-xl font-semibold">Unlock Creativity</h3>
            <p className="text-gray-700">
              From designing interactive user interfaces to crafting visually
              stunning websites, web development is a canvas for your creative
              expression.
            </p>
          </div>
  
          <div>
            <h3 className="text-xl font-semibold">Empower Your Career</h3>
            <p className="text-gray-700">
              In an increasingly digital world, web developers are in high demand
              across industries, offering lucrative career opportunities and job
              security.
            </p>
          </div>
  
          <div>
            <h3 className="text-xl font-semibold">Join a Thriving Community</h3>
            <p className="text-gray-700">
              Become part of a vibrant community of developers, sharing
              knowledge, collaborating on projects, and pushing the boundaries of
              web technology.
            </p>
          </div>
        </div>
  
        {/* Image Section */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src="https://desiznideaz.vercel.app/images/coursePageImg/skills.png"
            alt="Web development illustration"
            className="max-w-full"
          />
        </div>
      </section>
    );
  };
  
  export default WhyLearn;