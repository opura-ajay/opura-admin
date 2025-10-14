export default function TermsAndConditions() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-10 text-sm leading-6 text-neutral-800 dark:text-neutral-200">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Terms and Conditions
        </h1>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          Last updated: 2025-10-14
        </p>
      </header>

      <article className="space-y-8">
        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            1. Acceptance of Terms
          </h2>
          <p className="mt-2">
            By accessing or using the Admin App (“Service”), you agree to be
            bound by these Terms and any policies referenced herein, including
            our Privacy Policy. If you use the Service on behalf of an entity,
            you represent that you have authority to bind that entity.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            2. Eligibility and Accounts
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Service is intended for authorized administrative users.</li>
            <li>
              You must maintain the confidentiality of your credentials and are
              responsible for activities under your account.
            </li>
            <li>
              Notify us immediately of any unauthorized access or security
              incident.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            3. Use of the Service
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Comply with applicable laws and internal policies.</li>
            <li>
              Do not reverse engineer, interfere with, or bypass security or
              access controls.
            </li>
            <li>
              Do not upload malicious code or use the Service to infringe
              rights.
            </li>
            <li>
              Respect role-based access and data handling requirements in your
              organization.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            4. Administration and Roles
          </h2>
          <p className="mt-2">
            Your organization may configure roles, permissions, and visibility.
            Actions performed by users with elevated permissions may affect
            other users and data. Ensure changes are authorized and documented.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            5. Intellectual Property
          </h2>
          <p className="mt-2">
            The Service, including software, UI, and documentation, is owned by
            us or our licensors and protected by law. Except as expressly
            permitted, you may not copy, modify, create derivative works, or
            distribute any part of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            6. Third-Party Services
          </h2>
          <p className="mt-2">
            The Service may interoperate with third-party tools. Your use of
            such tools is subject to their terms and privacy policies. We are
            not responsible for third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            7. Privacy
          </h2>
          <p className="mt-2">
            Your use of the Service is subject to our Privacy Policy, which
            describes how we collect and process information. Please review it
            carefully.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            8. Availability and Support
          </h2>
          <p className="mt-2">
            We strive for high availability but do not guarantee uninterrupted
            access. Maintenance windows, updates, and incidents may affect
            availability. Support terms may be defined in a separate agreement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            9. Warranties and Disclaimers
          </h2>
          <p className="mt-2">
            The Service is provided “as is” and “as available.” To the fullest
            extent permitted by law, we disclaim all warranties, express or
            implied, including merchantability, fitness for a particular
            purpose, and non-infringement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            10. Limitation of Liability
          </h2>
          <p className="mt-2">
            To the maximum extent permitted by law, we will not be liable for
            indirect, incidental, special, consequential, or punitive damages,
            or any loss of profits, revenues, data, or goodwill, arising out of
            or related to your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            11. Indemnification
          </h2>
          <p className="mt-2">
            You agree to defend, indemnify, and hold us harmless from any
            claims, liabilities, damages, losses, and expenses arising from your
            use of the Service, violation of these Terms, or infringement of
            third-party rights.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            12. Termination
          </h2>
          <p className="mt-2">
            We may suspend or terminate access for any violation of these Terms
            or to protect the Service, users, or third parties. Upon
            termination, your rights to use the Service cease immediately.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            13. Governing Law and Disputes
          </h2>
          <p className="mt-2">
            These Terms are governed by the laws of your organization’s chosen
            jurisdiction unless otherwise specified in a master agreement.
            Disputes will be resolved in the courts or arbitration venue set
            forth therein.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            14. Changes to Terms
          </h2>
          <p className="mt-2">
            We may update these Terms. Material changes will be communicated via
            the admin interface or other appropriate channels. Continued use
            after changes indicates acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            15. Contact
          </h2>
          <p className="mt-2">
            For questions about these Terms, contact: legal@yourcompany.com.
          </p>
        </section>
      </article>
    </section>
  );
}