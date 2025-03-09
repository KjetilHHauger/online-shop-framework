import { useForm } from "react-hook-form";

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Full name is required.",
            minLength: {
              value: 3,
              message: "Full name must be at least 3 characters long.",
            },
          })}
          className="w-full p-2 border"
        />
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-gray-700">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          {...register("subject", {
            required: "Subject is required.",
            minLength: {
              value: 3,
              message: "Subject must be at least 3 characters long.",
            },
          })}
          className="w-full p-2 border"
        />
        {errors.subject && (
          <p className="text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /\S+@noroff\.no$/,
              message: "Email address is invalid. Requires @noroff.no",
            },
          })}
          className="w-full p-2 border"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="body" className="block text-gray-700">
          Body
        </label>
        <textarea
          id="body"
          {...register("body", {
            required: "Body is required.",
            minLength: {
              value: 3,
              message: "Body must be at least 3 characters long.",
            },
          })}
          className="w-full p-2 border"
        />
        {errors.body && <p className="text-red-500">{errors.body.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2">
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
