// components/Certification.tsx

const Certification = () => {
    return (
      <section className="flex flex-col md:flex-row items-center px-8 py-12">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://desiznideaz.vercel.app/images/coursePageImg/certificate.png"
            alt="Certificate of Internship"
            className="max-w-full"
          />
        </div>
  
        {/* Text Section */}
        <div className="md:w-1/2 mt-8 md:mt-0 space-y-4">
          <h2 className="text-2xl font-bold">
            Industry recognized & government approved Web Development certification
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span>
              DesiznIdeaz Trainings certificate trusted by 100,000+ companies.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span>
              Government approved certificate from AICTE (All India Council for
              Technical Education).
            </li>
          </ul>
        </div>
      </section>
    );
  };
  
  export default Certification;