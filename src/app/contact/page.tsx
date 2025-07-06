"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { FormData, FormErrors } from "@/app/contact/_types/contact";
import { initialFormData } from "@/app/contact/_lib/contactForm";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "お名前は必須です。";
    } else if (formData.name.length > 30) {
      newErrors.name = "お名前は30文字以内で入力してください。";
    }
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスは必須です。";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "メールアドレスの形式が正しくありません。";
    }
    if (!formData.message.trim()) {
      newErrors.message = "本文は必須です。";
    } else if (formData.message.length > 500) {
      newErrors.message = "本文は500文字以内で入力してください。";
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("送信に失敗しました");
      }

      alert("送信しました");
      setFormData(initialFormData);
    } catch (error) {
      alert(`エラー:${error instanceof Error ? error.message : "送信に失敗しました"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-10">お問い合わせフォーム</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
          <label htmlFor="name" className="md:w-[240px] mb-2 md:mb-0">
            お名前
          </label>
          <div className="w-full">
            <input type="text" id="name" className={`border ${errors.name ? "border-red-700" : "border-gray-300"} rounded-lg p-4 w-full`} value={formData.name} onChange={handleChange} disabled={isSubmitting} />
            {errors.name && <p className="text-red-700 text-sm mt-1">{errors.name}</p>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
          <label htmlFor="email" className="md:w-[240px] mb-2 md:mb-0">
            メールアドレス
          </label>
          <div className="w-full">
            <input type="email" id="email" className={`border ${errors.email ? "border-red-700" : "border-gray-300"} rounded-lg p-4 w-full`} value={formData.email} onChange={handleChange} disabled={isSubmitting} />
            {errors.email && <p className="text-red-700 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <label htmlFor="message" className="md:w-[240px] mb-2 md:mb-0">
            本文
          </label>
          <div className="w-full">
            <textarea id="message" rows={8} className={`border ${errors.message ? "border-red-700" : "border-gray-300"} rounded-lg p-4 w-full`} value={formData.message} onChange={handleChange} disabled={isSubmitting} />
            {errors.message && <p className="text-red-700 text-sm mt-1">{errors.message}</p>}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button type="submit" className={`${isSubmitting ? "bg-gray-400" : "bg-gray-800"} text-white font-bold py-2 px-4 rounded-lg mr-4`} disabled={isSubmitting}>
            送信
          </button>
          <button type="button" className="bg-gray-200 font-bold py-2 px-4 rounded-lg" onClick={handleClear} disabled={isSubmitting}>
            クリア
          </button>
        </div>
      </form>
    </>
  );
}
