import { useForm } from "../hooks/useForm";
import "../styles/ContactForm.css";

export function ContactForm() {
  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
  } = useForm({ name: "", email: "", message: "" });

  function onSubmitSuccess(data: typeof values) {
    alert(`Thank you, ${data.name}! Your message has been sent.`);
    // Optionally send data to an API here
  }

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      {isSubmitted && (
        <p className="success-message">Form submitted successfully!</p>
      )}
      <form onSubmit={(e) => handleSubmit(e, onSubmitSuccess)} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message*</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            className={errors.message ? "input-error" : ""}
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
