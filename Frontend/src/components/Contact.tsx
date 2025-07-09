import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  comment: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="max-w-7xl mx-auto p-8 py-16 ">
      <h2 className="text-4xl font-normal text-black mb-8">
              Contact
            </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          />
        </div>
        
        <div>
          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          />
        </div>
        
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="bg-gray-800 text-white px-8 py-3 font-medium hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;