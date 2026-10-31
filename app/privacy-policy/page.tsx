import type { Metadata } from "next";
import Image from "next/image";
import BranchesFooter from "@/components/BranchesFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | STAIRS Physiotherapy & Fitness",
  description: "How STAIRS Physiotherapy and Fitness collects, uses and protects your personal data.",
};

const css = `
  .pp-page { background: #0a0a0a; color: #cfcfcf; min-height: 100vh; font-family: var(--font-barlow), 'Barlow', sans-serif; }
  .pp-nav { position: absolute; top: 0; left: 0; right: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 18px 60px; }
  .pp-nav a.back { color: #fff; font-size: 0.78rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; border: 2px solid #e8372c; border-radius: 30px; padding: 9px 24px; transition: background 0.3s; text-decoration: none; }
  .pp-nav a.back:hover { background: #e8372c; }
  .pp-hero { padding: 150px 24px 50px; text-align: center; background: radial-gradient(ellipse 600px 260px at 50% 0%, rgba(232,55,44,0.28), transparent 70%), #0a0a0a; }
  .pp-label { display: block; font-weight: 600; font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; color: #e8372c; margin-bottom: 10px; }
  .pp-hero h1 { font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-weight: 400; font-size: clamp(2.6rem, 6vw, 4.6rem); letter-spacing: 2px; text-transform: uppercase; color: #fff; line-height: 1.05; margin: 0; }
  .pp-hero h1 span { color: #e8372c; }
  .pp-body { max-width: 880px; margin: 0 auto; padding: 10px 24px 90px; font-size: 1rem; line-height: 1.85; }
  .pp-body p { margin: 0 0 18px; }
  .pp-body h2 { font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-weight: 400; font-size: clamp(1.7rem, 3vw, 2.2rem); letter-spacing: 1.5px; text-transform: uppercase; color: #fff; margin: 46px 0 16px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .pp-body h2::before { content: ''; display: inline-block; width: 10px; height: 10px; background: #e8372c; border-radius: 50%; margin-right: 12px; vertical-align: middle; }
  .pp-body h3 { font-weight: 800; font-size: 1.05rem; letter-spacing: 2px; text-transform: uppercase; color: #fff; margin: 30px 0 14px; text-decoration: underline; text-decoration-color: #e8372c; text-decoration-thickness: 2px; text-underline-offset: 7px; }
  .pp-body strong { color: #fff; font-weight: 700; }
  .pp-body a { color: #fff; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(255,255,255,0.4); transition: color 0.25s; }
  .pp-body a:hover { color: #e8372c; }
  .pp-branch { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px 22px; margin: 0 0 16px; }
  .pp-branch h3 { margin-top: 0; }
  .pp-branch p { margin: 0 0 8px; }
  .pp-branch p:last-child { margin-bottom: 0; }
  @media (max-width: 768px) {
    .pp-nav { padding: 12px 18px; }
    .pp-hero { padding: 120px 18px 36px; }
    .pp-body { padding: 6px 18px 64px; font-size: 0.95rem; }
  }
`;

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p>
      <strong>{label}:</strong> {children}
    </p>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{css}</style>
      <div className="pp-page">
        <nav className="pp-nav">
          <a href="/">
            <Image src="/logo.png" alt="Stairs" width={140} height={70} style={{ height: 56, width: "auto" }} priority />
          </a>
          <a href="/" className="back">Back to Home</a>
        </nav>

        <header className="pp-hero">
          <span className="pp-label">Stairs Physiotherapy &amp; Fitness</span>
          <h1>Privacy <span>Policy</span></h1>
        </header>

        <main className="pp-body">
          <p>
            STAIRS Physiotherapy and Fitness ensures the confidentiality of its clients’ personal data with utmost care. We may use certain statistics from your data for internal research purposes without disclosing the identity of the client, in any manner. For all other purposes, we seek our client’s permission to use their name and personal data.
          </p>
          <p>
            We made sure that this Policy is as transparent, clear and concise as possible. It is important that you read it carefully and calmly since the privacy we guarantee is only as complete as your knowledge of it.
          </p>
          <p>
            We also recommend the full reading of the Regulation 2016/679 of the European Parliament and of the Council, also known as the General Data Protection Regulation (hereinafter GDPR), where you can learn more on privacy and protection of personal data.
          </p>

          <h2>Scope of this Privacy Policy</h2>
          <p>
            This Privacy Policy applies to all users of the website Stairsphysiotherapy.in and its subdomains, whether or not they register, to all users of the mobile application, from the moment they install it on their device mobile, to all users of the platform who register for the trial period as well as for all those who actually contract our services after the trial period ends.
          </p>
          <p>
            The application of this Privacy Policy is irrelevant to the territorial scope, applying to all users from the moment they open our website or our mobile application, no matter where they are located.
          </p>
          <p>
            The use of the services provided by STAIRS is conditioned by the acceptance of the Terms and Conditions of Use and the reading of this Policy. In the event that you do not agree to these stipulations, please do not use our services.
          </p>

          <h2>What data do we collect?</h2>
          <p>
            The collection and processing of data is fundamental to the operation of STAIRS. It’s based on that data that our project is built and it’s that informational core that allows us to provide you with a service in the area of wellness and client management that is known for its excellence. We have reviewed and limited the data collection and the period of retention of the data to the minimum necessary.
          </p>
          <p>
            There are various sets of information and data that we collect and process. To simplify, we’ll be dividing those sets of information in three large groups: Professionals, Clients and Secretaries.
          </p>

          <h3>Professionals’ data</h3>
          <Item label="Data required from the Professional upon registration">
            all data entered by the Professional when registering on the platform is stored and processed. It is this registry that allows us to identify the Professional and give him/her access to the reserved area of query management as well as correctly connect him/her to the clients that he/she inserts. In addition, this is the data we deem indispensable, together with the billing data, so that the contractual relationship between STAIRS and the Professional is carried out regularly. The data we require when registering is: the full name, the name of the primary place of work, the gender, country of residence, email and, of course, a password. In addition to these, all data voluntarily inserted by the Professionals during their use of the software is processed.
          </Item>
          <Item label="Payment data">
            the payment data of your monthly payment are also processed by STAIRS, although for this purpose a processor is used. Only then can we debit the amounts associated with the monthly payment you have chosen. The data required for this purpose is: a credit or debit card number, an expiration date and a security code.
          </Item>
          <Item label="Billing data">
            in order to comply with our tax obligations, we must ask you for some billing information such as: name, tax number, address, city, postal code and country.
          </Item>
          <Item label="Automatically collected data">
            in addition to the data mentioned above, we also automatically collect, through cookies and other methods and services, a set of data that allows us to know precisely how you use the platform, the country, the date and time of the login, among other information. In addition to this information we also collected other data such as the I.P. address, the browser you use to access and its version, the language, your device operating system, among others. We would like to emphasise that this type of data collection is mainly intended to facilitate the work of our team whenever you need our support. It’s the collection of these groups of information that allows the quick resolution of problems on our platforms, without it we wouldn’t be able to guarantee the normal operation of our service and its maintenance. For more information please check our section on how we disclose and share data with third parties (subprocessors) and our cookie policy.
          </Item>

          <h3>Clients’ data</h3>
          <p>
            Clients’ data is directly collected, for the most part, by the Professional. He/She is the controller and the main responsible for the processing of the clients’ personal data. Having said that, besides a minimum set of legally required measures, STAIRS is not responsible for providing the information and guarantees imposed by the GDPR on the Professionals in regard to their relationship with the Client.
          </p>
          <p>
            A series of personal data might be requested by the Professional to the Client, or recorded by observation, which may range from “simple” personal data categories (such as: billing data, user identification number, among others, such as name complete, address, cell phone, and many more) to data considered as “special” (examples of this type of data include race, personal and social history, clinical history, food history, body measurements, among other information).
          </p>
          <p>
            STAIRS only treats Client data as it is entered by the Professional, or directly through the mobile application. The use of the mobile application is intended for use by clients and is, of course, optional and, in cases where it is used, we collect the following data:
          </p>
          <Item label="Data entered by the client">
            all data entered by the client, be it when logging in into the mobile application or posteriorly, is stored and processed. It’s this set of data that allows us to identify the client, to give him/her access to their reserved area, to associate them correctly with the Professional who advised them and to give them access to their plans. Examples of such data include login credentials, but also other data such as the amount of water ingested, weight, and other information.
          </Item>
          <Item label="Location data">
            with the use of the mobile application we may access information contained in the GPS of your mobile device. However, this operation is optional and must always be previously consented by the user.
          </Item>
          <Item label="Local files, notifications and other data">
            on certain occasions the mobile application may access, with the Client prior consent and by their order, to local files or information stored in other applications. All these operations are optional, serving only as a way of complimenting and enhancing the usefulness of the service we provide.
          </Item>
          <Item label="Notifications">
            for the convenience of the Client, the STAIRS application will send notifications about their food plans, workout plans, payment information, amounts of water, messages and appointments. These notifications are updated daily, automatically. This feature can be disabled at any time in the application settings.
          </Item>
          <Item label="Health Apps">
            at the Client’s request the STAIRS application may connect to other health applications such as Apple Health, Fitbit etc. In these cases, data on physical activity, namely, steps, distance and active calories will be collected.
          </Item>
          <Item label="Camera and Gallery">
            at the Client’s request, the application can access the camera and the image gallery of the mobile device, allowing the Client to take pictures and send them through message to their Professional or send images already stored in the gallery.
          </Item>
          <Item label="Automatically collected data">
            in addition to the data mentioned above, we also automatically collect, through cookies and other methods and services, a set of data that allows us to know precisely how you use the platform, the country, the date and time of the login, among other information. In addition to this information we also collected other data such as the I.P. address, the browser you use to access and its version, the language, your device operating system, among others. We would like to emphasise that this type of data collection is mainly intended to facilitate the work of our team whenever you need our support. It’s the collection of these groups of information that allows the quick resolution of problems on our platforms, without it we wouldn’t be able to guarantee the normal operation of our service and its maintenance. For more information please check our section on how we disclose and share data with third parties (sub processors) and our cookie policy.
          </Item>

          <h3>Secretaries’ data</h3>
          <p>
            Like the Clients’ data, Secretaries’ data is also directly collected, for the most part, by the Professional. He/She is the controller and the main responsible for the processing of the Secretaries’ personal data, and may lack consent in the context of their contractual relations to which STAIRS is unrelated.
          </p>
          <p>
            However, when using the platform, and in addition to the treatment performed on the data entered directly by the Professional, STAIRS also collects some data which was already listed in relation to the Professional as “Automatically collected data”, and so, we ask you to check this section.
          </p>

          <h2>Purposes of the processing</h2>
          <p>
            We use the data we collect for a series of purposes that we want to make known. Those purposes may be based on a legal obligation, the legitimate interests of STAIRS, the performance of the contract or consent, depending on the case.
          </p>
          <Item label="Provision of our service">
            we use the vast majority of the data entered, either by Professionals or Clients, so that we can provide our service as efficiently as possible within the contractual relationship established between STAIRS and the Professional.
          </Item>
          <Item label="Maintenance and improvement of services">
            we conduct behavioural analysis of the use made by the Professionals and by the Clients of the website and the mobile application. It is fundamentally this type of analysis that allows us to determine the usefulness of certain functionalities and change or correct them depending on the result. In addition, we may use your non-anonymized data in the context of the communication of a bug or error in the software by the user and always with the purpose of solving it. We can also, for example, at the request of the user, copy data between accounts.
          </Item>
          <Item label="Customer support">
            it is essential for the quality of our service that we can answer efficiently to all the questions you ask us, using for that purpose any personal data that we deem necessary for the contact and resolution of the question that may arise, which may be, depending on the case, your full name, your email, your mobile phone number or your address, among other information. In addition to this data and with the same purpose, we may collect usage statistics of our platforms.
          </Item>
          <Item label="Billing">
            it would be impossible for us to comply with our legal and tax obligations if we did not address the processing of some billing information. It is only for this purpose that we collect, at the time of payment, personal data such as the tax identification number, among others already listed above.
          </Item>
          <Item label="Legal matters">
            we may use your personal data to comply with court orders and tax and administrative inspections, among other legal requirements. In the eventuality of a court order, all personal data, be it from a simple or special category, of the Professionals’ or Clients’, may be, if our legal team agrees with the legal basis of the warrant, made available in full to the administrative or judicial authority in question.
          </Item>
          <Item label="Marketing">
            we may use your data to send you emails, notifications, text messages and postal mail. We will never do it, however, without your express authorisation and you can freely choose not to subscribe and continue enjoying the rest of our services. In order to provide you with a tailor-made experience, the processing of such communications may be subject to automated individual decision-making, including profiling.
          </Item>
          <Item label="Security and contractual purposes">
            we use your data to perform behaviour analysis in order to prevent or address suspicious or fraudulent conducts and to ensure that the contractual relationship between STAIRS and the Professional is timely met.
          </Item>

          <h2>Data retention period</h2>
          <p>
            Personal data may be retained for different periods of time depending on its legal relevance or the duration of the contractual relationship.
          </p>

          <h2>Professionals’ rights</h2>
          <p>
            We want to ensure that your rights are fully respected. In those situations where the automatic mechanisms already implemented do not allow us to fully guarantee these rights you can contact us through <a href="mailto:stairsphysiotherapy@gmail.com">stairsphysiotherapy@gmail.com</a>
          </p>
          <Item label="Right of access">
            the data subject has the right to access the information concerning him/her, namely the purposes of the processing, the categories of personal data processed, and other information. You are already able to instantly access most of this information in your profile area.
          </Item>
          <Item label="Right to rectification">
            the data subject has the right to obtain correction of inaccurate or incomplete personal data, and where it is compatible with the purposes of processing, the right to rectify it. You are already able to correct and rectify most of your personal data in your profile area.
          </Item>
          <Item label="Right to erasure (“right to be forgotten”)">
            the data subject has the right to obtain the erasure of personal data concerning him/her without undue delay. Starting from this request the countdown for the total and definitive deletion of the data of all the servers begins.
          </Item>
          <Item label="Right to restriction of processing and right to object">
            these rights may be exercised, if applicable, by reaching us through the contacts provided above.
          </Item>
          <Item label="Right to data portability">
            the data subject has the right to receive, in a reusable digital format, all information concerning him/her, which he/she has provided to STAIRS.
          </Item>

          <h2>Security</h2>
          <p>
            The security of your data and the services we provide are one of our highest priorities. As such, we regularly review our platforms and servers to ensure that all measures are being taken to mitigate security risks, using the most current encryption, surveillance and auditing techniques. These measures may only reflect on our servers or, otherwise, have immediate impact on our platforms, such as increased password complexity, new SSL certificates, two-step verification, and more.
          </p>

          <h2>Changes and amendments to this Privacy Policy</h2>
          <p>
            STAIRS’ Privacy Policy is subject to constant and periodic review. As a result of legal developments, recommendations issued by the control authorities, or changes to our business model, among others, we may have to amend this Policy. We recommend that you visit this page regularly and keep up with the latest updates. We will notify you whenever we make substantial changes to this Policy that might jeopardise your rights.
          </p>

          <h2>Contacts</h2>
          <p>
            If at the end of this reading you still have doubts or to exercise your rights, please contact us at:
          </p>
          <p>
            <strong>STAIRS Physiotherapy and Fitness</strong>
            <br />
            <a href="mailto:stairsphysiotherapy@gmail.com">stairsphysiotherapy@gmail.com</a>
          </p>
          <p>or</p>

          <div className="pp-branch">
            <h3>Ulsoor Branch</h3>
            <p>
              Salma Business House,<br />
              34/1, Kensington Road,<br />
              Pulikeshi Nagar, Ulsoor,<br />
              Bengaluru, Karnataka - 560005
            </p>
            <p>
              Call/WhatsApp: <a href="tel:+919886555563">+91 9886555563</a>
              <br />
              (Monday to Saturday, 9am - 6pm)
            </p>
          </div>

          <div className="pp-branch">
            <h3>Koramangala Branch</h3>
            <p>
              No. 577, 8th Block,<br />
              Ganapati Temple Road, 80 Feet Road,<br />
              Koramangala, Bengaluru,<br />
              Karnataka - 560095
            </p>
            <p>
              Call/WhatsApp: <a href="tel:+918310331077">+91 8310331077</a>
              <br />
              (Monday to Saturday, 9am - 6pm)
            </p>
          </div>
        </main>

        <BranchesFooter />
      </div>
    </>
  );
}
