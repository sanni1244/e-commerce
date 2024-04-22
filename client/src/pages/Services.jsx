import React from 'react'
import '../styles/faq-about.css'

const Services = () => {
  document.title = "Services"
    return (
        <div className="dvv">
            <div className='space-between'>
                <section id='contact' className="contact-us">
                    {/* Contact Us Title */}
                    <h2>Contact Us</h2>

                    {/* Contact Information */}
                    <div className="contact-info">
                        {/* Customer Support Section */}
                        <div className="customer-support">
                            <h3>Customer Support</h3>
                            <p>Our dedicated customer support team is available to assist you with any questions, concerns, or feedback you may have. You can reach us through the following channels:</p>
                            <ul>
                                <li>Phone: 1-800-123-4567 (Monday to Friday, 9am to 5pm)</li>
                                <li>Email: support@o-flash.com</li>
                                <li>Live Chat: Available on our website during business hours</li>
                            </ul>
                        </div>

                        {/* Corporate Headquarters Section */}
                        <div className="corporate-headquarters">
                            <h3>Corporate Headquarters</h3>
                            <p>If you need to contact our corporate headquarters for business inquiries or partnerships, please use the following contact information:</p>
                            <ul>
                                <li>Address: 123 Main Street, Cityville, State, ZIP</li>
                                <li>Phone: 1-800-987-6543</li>
                                <li>Email: info@o-flash.com</li>
                            </ul>
                        </div>
                    </div>
                </section>



                <section id='faqs' className="faqs">
                    {/* FAQs Title */}
                    <h2>Frequently Asked Questions</h2>

                    {/* General Questions Section */}
                    <div className="faq-category">
                        <h3>General Questions</h3>
                        <ul>
                            <li>
                                <strong>Q: How do I create an account?</strong>
                                <p>A: You can create an account by clicking on the "Sign Up" link at the top of our website and following the prompts.</p>
                            </li>
                            <li>
                                <strong>Q: How do I track my order?</strong>
                                <p>A: Once your order has been shipped, you will receive a tracking number via email. You can use this tracking number to monitor the status of your delivery.</p>
                            </li>
                            <li>
                                <strong>Q: How do I reset my password?</strong>
                                <p>A: There are currently no options for resetting passwords. Please contact our customer support team for assistance in retrieving the account.</p>
                            </li>
                            <li>
                                <strong>Q: Can I change my shipping address after placing an order?</strong>
                                <p>A: Once an order has been placed, changes to the shipping address may not be possible. Please contact our customer support team as soon as possible if you need to make any modifications to your order.</p>
                            </li>
                            <li>
                                <strong>Q: How can I contact customer support?</strong>
                                <p>A: You can contact our customer support team via phone, email, or live chat. Visit our Contact Us page for more information on how to reach us.</p>
                            </li>
                            <li>
                                <strong>Q: Can I cancel my order?</strong>
                                <p>A: Orders can typically be canceled within a short window after placing them. Please contact our customer support team immediately if you wish to cancel your order.</p>
                            </li>
                            <li>
                                <strong>Q: Do you offer international shipping?</strong>
                                <p>A: Yes, we offer international shipping to select countries. Shipping fees and delivery times may vary depending on the destination.</p>
                            </li>
                            <li>
                                <strong>Q: How can I leave feedback or a review?</strong>
                                <p>A: You can leave feedback or a review by navigating to the product page of the item you purchased. Look for the option to leave a review or provide feedback.</p>
                            </li>
                            <li>
                                <strong>Q: What should I do if I receive a damaged item?</strong>
                                <p>A: If you receive a damaged item, please contact our customer support team immediately. We will assist you in resolving the issue and arranging for a replacement or refund.</p>
                            </li>
                            <li>
                                <strong>Q: How do I subscribe to marketing emails?</strong>
                                <p>A: We currently do not offer this service, but we'll be sure to make our customers aware once it becomes available.</p>
                            </li>
                            <li>
                                <strong>Q: Can I change or cancel my order after it has been placed?</strong>
                                <p>A: Changes or cancellations to orders may not be possible once they have been processed. Please contact our customer support team as soon as possible if you need to make any modifications to your order.</p>
                            </li>
                            <li>
                                <strong>Q: What is your return policy?</strong>
                                <p>A: Our return policy allows for returns within 30 days of purchase for eligible items. Please refer to our Returns & Exchanges page for more information on our return policy and eligibility criteria.</p>
                            </li>
                            <li>
                                <strong>Q: How can I check the status of my order?</strong>
                                <p>A: You can check the status of your order by logging into your account and navigating to the "Order History" section. Alternatively, you can track your order using the tracking number provided in your order confirmation email.</p>
                            </li>
                            <li>
                                <strong>Q: Are your products covered by a warranty?</strong>
                                <p>A: Some of our products may be covered by a manufacturer's warranty. Please check the product description or contact our customer support team for more information about warranty coverage.</p>
                            </li>
                            <li>
                                <strong>Q: How do I change my email address?</strong>
                                <p>A: You can change your email address by logging into your account and navigating to the "Account Settings" or "Profile" section. From there, you should find an option to update your email address.</p>
                            </li>
                            <li>
                                <strong>Q: Do you offer price matching?</strong>
                                <p>A: We strive to offer competitive prices on all of our products. However, if you find a lower price for the same item elsewhere, please contact our customer support team, and we'll do our best to match or beat it.</p>
                            </li>
                            <li>
                                <strong>Q: How do I change my billing address?</strong>
                                <p>A: You can change your billing address by logging into your account and navigating to the "Account Settings" or "Profile" section. From there, you should find an option to update your billing address.</p>
                            </li>
                            <li>
                                <strong>Q: Are your products environmentally friendly?</strong>
                                <p>A: We strive to offer environmentally friendly products whenever possible. Look for products labeled as eco-friendly or sustainable in our product listings.</p>
                            </li>
                            <li>
                                <strong>Q: Can I order products in bulk?</strong>
                                <p>A: Yes, we offer bulk ordering options for select products. Please contact our customer support team for more information on bulk ordering and pricing.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Payment & Shipping Section */}
                    <div className="faq-category">
                        <h3>Payment & Shipping</h3>
                        <p>If you have questions about payments, shipping, or returns, please refer to our Payment Information, Shipping Information, and Returns & Exchanges sections for more detailed information.</p>
                    </div>

                    {/* Add more FAQ categories and questions here */}
                </section>


                <section id='shipping' className="shipping-information">
                    <h2>Shipping Information</h2>

                    <h3>Domestic Shipping</h3>
                    <p>We offer standard and expedited shipping options for domestic orders within the United States. Standard shipping typically takes 3-5 business days, while expedited shipping delivers within 1-2 business days.</p>

                    <h3>International Shipping</h3>
                    <p>For international orders, we provide various shipping options depending on the destination country and package weight. International shipping times may vary, and additional customs fees or import duties may apply.</p>
                </section>

                <section id='returns' className="returns-exchanges">
                    <h2>Returns & Exchanges</h2>

                    <h3>Return Policy</h3>
                    <p>We accept returns for eligible items within 30 days of purchase. To initiate a return, please contact our customer support team to obtain a return authorization and instructions.</p>

                    <h3>Exchange Policy</h3>
                    <p>If you wish to exchange an item for a different size or color, please contact us to arrange for an exchange. Exchanges are subject to availability and must be initiated within 30 days of purchase.</p>
                </section>

            </div>
        </div>
    )
}

export default Services
