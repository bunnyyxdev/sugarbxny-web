export default function CookiesPolicy() {
  return (
    <div className="py-12 bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 min-h-screen transition-colors">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-pink-100 dark:border-gray-700">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 dark:from-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">
                1. What Are Cookies?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">
                2. How We Use Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Sugarbunny Stores uses cookies to enhance your browsing experience and provide personalized services. We use cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2 ml-4">
                <li>To remember your preferences and settings</li>
                <li>To keep you logged in to your account</li>
                <li>To track items in your shopping cart</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To improve our website functionality and user experience</li>
                <li>To provide personalized content and recommendations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">
                3. Types of Cookies We Use
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                3.1 Essential Cookies
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2 ml-4">
                <li><strong>Session Cookies:</strong> Maintain your login state and shopping cart</li>
                <li><strong>Security Cookies:</strong> Protect against fraud and unauthorized access</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                3.2 Functional Cookies
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2 ml-4">
                <li><strong>Preference Cookies:</strong> Remember your theme preferences (light/dark mode)</li>
                <li><strong>Language Cookies:</strong> Remember your language selection</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                3.3 Analytics Cookies
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2 ml-4">
                <li><strong>Performance Cookies:</strong> Track page views and navigation patterns</li>
                <li><strong>Analytics Cookies:</strong> Help us understand user behavior and improve our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">
                4. Third-Party Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements, and provide other features. These third-party cookies may include:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2 ml-4">
                <li><strong>Vercel Analytics:</strong> Website analytics and performance monitoring</li>
                <li><strong>Payment Processors:</strong> Secure payment processing (Stripe, etc.)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">
                5. Managing Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. However, this may prevent you from taking full advantage of our website.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                To manage cookies in your browser:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2 ml-4">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Please note that blocking or deleting cookies may impact your experience on our website. Some features may not function properly if cookies are disabled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">
                6. Cookie Duration
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Cookies can be either "session" or "persistent" cookies:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2 ml-4">
                <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Our session cookies typically expire when you close your browser, while persistent cookies may remain for up to 7 days or as specified in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">
                7. Updates to This Cookie Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-200 mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong>Email:</strong> support@sugarbunny.com<br />
                <strong>Working Hours:</strong> 12:00 PM - 6:00 AM<br />
                <strong>Subject:</strong> Cookie Policy Inquiry
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

