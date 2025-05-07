// contactForm.tsx
import React, { useState } from "react";

interface ContactFormProps {
  formType: string;
  onClose: () => void;
}

export function ContactForm({ formType, onClose }: ContactFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission logic
    console.log("Form submitted:", formData);
    alert("Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.");
    onClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Заявка на {formType}</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-colorSecondaryHalfLight transition-colors"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Ваше имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-colorSecondaryLight rounded-lg focus:outline-none focus:ring-2 focus:ring-colorDark"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-colorSecondaryLight rounded-lg focus:outline-none focus:ring-2 focus:ring-colorDark"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-colorSecondaryLight rounded-lg focus:outline-none focus:ring-2 focus:ring-colorDark"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="message">
            Сообщение
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-colorSecondaryLight rounded-lg focus:outline-none focus:ring-2 focus:ring-colorDark"
          ></textarea>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-colorSecondaryLight rounded-lg hover:bg-colorSecondaryHalfLight transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-colorDark text-colorLight rounded-lg hover:bg-colorSecondaryDark transition-colors"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
}