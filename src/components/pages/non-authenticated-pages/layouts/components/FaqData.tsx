import { Link } from "react-router-dom";
import { paths } from "util/paths";
import { Paragraph } from "../../global-styles/typogarphy";

export const Faqs = [
  {
    question: "How do I set up a transfer?",
    answers: (
      <Paragraph $small>
        Setting up a transfer is easy, and can be done in a few simple steps.
        <br />
        <br />
        To start, key in the amount you want to send to obtain a quote and
        choose a delivery method. Then login or sign-up if you don’t already
        have an account. Enter the recipient details and pay for the transfer
        with either a debit or credit card or a bank transfer.
        <br />
        <br />
        Your transfer will then be processed and delivered to your recipient.
        The delivery time of your transfer may vary depending on the country you
        are sending to, the delivery method you choose and how you pay for the
        transfer. You can find more information about delivery times here.
        <br />
      </Paragraph>
    ),
  },
  {
    question: "How long will my transfer take?",
    answers: (
      <Paragraph $small>
        On average, a transfer with SB Remit takes up to 10 minutes by mobile
        money wallet and cash pick-up, with bank transfer taking up to one
        working day. The delivery time of your transfer may vary depending on
        the country you are sending to, the delivery method you choose and how
        you pay for the transfer.
        <br />
        <br />
        If you pay with faster payment in the UK, it can take up to two hours
        for your payment to reach SB Remit’s account. For other European
        countries, it can take up to 2 workings days. Once we have received your
        payment, we will immediately process your transfer and notify you via
        email and push notification. Payments done by card are a much faster
        option, as they only take a few minutes to reach our account.
        <br />
        <br />
        Please note that sometimes transfers can take a little bit longer if
        additional documents are required or if you send money over the weekend
        or on public holidays.
      </Paragraph>
    ),
  },
  {
    question: "How can I pay for my transfer?",
    answers: (
      <Paragraph $small>
        You can easily pay for your transfer with either a debit/credit card or
        a bank transfer. Please note that the maximum amount for card payments
        is 20,000 GBP/24,000 EUR. If you are paying with a bank transfer, you
        can send the money to SB Remit’s bank account using the following
        details:
        <ul>
          <li>
            <span className="key">GBP:</span> <span className="value"></span>{" "}
          </li>
          <li>
            <span className="key">Bank name:</span>{" "}
            <span className="value"></span>{" "}
          </li>
          <li>
            <span className="key">Account name:</span>{" "}
            <span className="value">Sukate & Bezeboh Ltd</span>{" "}
          </li>
          <li>
            <span className="key">Sort code:</span>{" "}
            <span className="value"></span>{" "}
          </li>
          <li>
            <span className="key">Account number:</span>{" "}
            <span className="value"></span>{" "}
          </li>
          <li>
            <span className="key">EUR:</span> <span className="value"></span>{" "}
          </li>
          <li>
            <span className="key">Bank name:</span>{" "}
            <span className="value"></span>{" "}
          </li>
          <li>
            <span className="key">IBAN:</span> <span className="value"></span>{" "}
          </li>
          <li>
            <span className="key">BIC:</span> <span className="value"></span>{" "}
          </li>
        </ul>
      </Paragraph>
    ),
  },
  {
    question: "Can I make recurring transfers?",
    answers: (
      <Paragraph $small>
        SB Remit currently does not have the option for setting up recurring
        transfers. We’re constantly adding new features, so keep an eye out as
        we hope to offer this in the future. However, details of your recipients
        are saved in your account to make it easier for you to effect new
        transfers. This means new transfers to existing recipients can be done
        with a single click once you sign into your account.
      </Paragraph>
    ),
  },
  {
    question: "What is a Transfer ID?",
    answers: (
      <Paragraph $small>
        A Transfer ID is a unique number given to every transfer you set up. It
        is the number you’ll need to give our Customer Support team if you
        contact them with any questions. You can find the Transfer ID in your
        transfer history and in emails you’ve received.
      </Paragraph>
    ),
  },
  {
    question: "How do I cancel my SB Remit transfer?",
    answers: (
      <Paragraph $small>
        While we do our best to fulfil cancellation requests, please note that
        it’s not always possible to do so, particularly if the transfer has
        reached your recipient or their receiving bank. If you wish to request a
        cancellation, please contact SB Remit’s customer service through the
        number on their website.
        <br /> Alternatively, using the SB Remit website:
        <ul>
          <li>
            Navigate to the{" "}
            <a className="default-link" href={paths.LANDING}>
              www.sbremit.com
            </a>{" "}
            support centre
          </li>
          <li>
            Click the <b className="green-txt">"contact us”</b> button at the
            top of the page
          </li>
          <li>
            Send us a message with the transfer ID and the details of your
            cancellation request.
          </li>
        </ul>
        <span>
          Our team will then review your request and let you know if
          cancellation is possible. If successful, the cancellation process
          takes 24 hours. A refund will then be initiated.
        </span>
        <br />
        <br />
        <span>
          Refunds take up to five working days, depending on the speed of your
          bank. Card payments are refunded within 48 hours, though this can take
          longer during bank holidays and weekends.
        </span>
      </Paragraph>
    ),
  },
  {
    question: "How can I view the status of my transfer?",
    answers: (
      <Paragraph $small>
        Your recent transfers will appear on the home screen of the SB Remit
        website or app after you log in. Tap the relevant transfer to see its
        status. You will also receive updates by email, including a notification
        that the transfer has been delivered successfully.
      </Paragraph>
    ),
  },
  {
    question:
      "Why does the status say “Transfer completed”, but the money isn’t in my recipient’s account?",
    answers: (
      <Paragraph $small>
        <span>
          When you see the status{" "}
          <span className="green-txt">“transfer completed”</span> , it means
          that we’ve handed over the money to your recipient’s bank. Most banks
          credit the money to the receiving account quite quickly, but some take
          up to 24 hours. Your recipient will need to contact their bank for
          further information. <br /> Occasionally the receiving bank rejects
          the transfer after we’ve handed over the money. This usually happens
          if there is a mistake in the bank details the sender entered. We will
          contact you as soon as we are notified about the rejection by the
          receiving bank. This can take several business days, depending on the
          speed of the bank.
        </span>
        <br />
        <br />
        <span className="note">
          If your transfer has not been delivered within three business days and
          you have not heard from us, please contact us via our customer
          service.
        </span>
      </Paragraph>
    ),
  },
  {
    question: "What is the best way to transfer money internationally?",
    answers: (
      <Paragraph $small>
        An international bank transfer is the best way to transfer money abroad.
        International money transfers are quicker, cheaper, and more secure than
        other methods such as cash, money orders, or credit cards. A money
        remittance company such as SB Remit offers this, providing zero
        transaction fees and excellent exchange rates, all with multiple
        delivery options through its transparent and customer-friendly service.
      </Paragraph>
    ),
  },
  {
    question: "How do I transfer money from the UK to Africa?",
    answers: (
      <Paragraph $small>
        A money transfer company can facilitate an international money transfer
        from the UK to Africa. A money remittance company like SB Remit can give
        you excellent value for money with competitive exchange rates, various
        delivery options and a user-friendly experience with no hidden
        transaction fees. SB Remit can help you transfer money from the UK to
        countries such as Cameroon, Uganda, Tanzania, and Kenya, with other
        African countries being available for money transfer soon.
      </Paragraph>
    ),
  },
  {
    question: "Can I transfer money online immediately?",
    answers: (
      <Paragraph $small>
        The speed of online money transfers depends on where you are attempting
        to transfer the money and through what service. With{" "}
        <Link to={paths.LANDING}>SB Remit</Link> , an online money transfer can
        take up to 10 minutes by mobile money wallet and cash pick-up, whilst
        when sending money overseas via a bank transfer, this can take up to one
        working day, but this depends on what currencies are involved.
      </Paragraph>
    ),
  },
  {
    question: "What does money remittance mean?",
    answers: (
      <Paragraph $small>
        Money remittance can generally refer to a money transfer between two
        parties but can also more specifically describe someone sending money
        abroad to another country. The remittance of money is commonly used for
        those who have moved abroad for work purposes and want to support loved
        ones at home financially. Money remittance can be sent through a money
        transfer service and received back home through cash pickup or bank
        transfer.
      </Paragraph>
    ),
  },
  {
    question: "What does a money transfer company do?",
    answers: (
      <Paragraph $small>
        A money transfer company allows you to send money both domestically and
        overseas. They offer a service whereby the money transfer company
        collects money from the sender and delivers it to the beneficiary. As
        this is done electronically whereby no physical money is exchanged, the
        money transfer company can process money around the world between
        different currencies and exchanges.
      </Paragraph>
    ),
  },
  {
    question: "How long does it take to send money overseas?",
    answers: (
      <Paragraph $small>
        Using an app or online international money transfer service means that
        you can transfer money internationally quickly. With SB Remit, a
        transfer can take up to 10 minutes by mobile money wallet and cash
        pick-up, whilst when sending money overseas via a bank transfer, this
        can take up to one working day. If you pay with the UK’s faster payment
        option, it should take up to two hours for your payment to reach SB
        Remit’s account.
        <br />
        <br />
        Delivery time of your transfer may be{" "}
        <Link to={paths.HELP}>affected by the timing of the transfer</Link>,
        where the transfer is being made, the currencies involved, security
        checks, and bank holidays.
      </Paragraph>
    ),
  },
  {
    question: "What is the safest way to send money online?",
    answers: (
      <Paragraph $small>
        The safest way of transferring money is through a trusted money transfer
        service that specializes in international payments. SB Remit has no
        hidden transaction fees, multiple delivery options, and offers excellent
        exchange rates all in a transparent and secure service, making it a very
        safe way to send money internationally.
      </Paragraph>
    ),
  },
  {
    question: "How does international money transfer work?",
    answers: (
      <Paragraph $small>
        International money transfers use a network to transmit wire transfer
        information between thousands of banks and financial institutions
        online. An international money transfer begins with digital instructions
        being sent from the sender’s financial service to the recipient’s bank.
        The international money transfer instructions are sometimes sent to the
        intermediary banks before arriving at the final destination.
      </Paragraph>
    ),
  },
  {
    question: "Can I send money from the UK to Africa?",
    answers: (
      <Paragraph $small>
        You can quickly and easily send money from the UK to Africa. SB Remit
        provides a transparent and flexible money transfer service with
        competitive exchange rates. With SB Remit, you can send money from the
        UK to African countries such as Cameroon, Uganda, Tanzania, and Kenya,
        with more countries being available for international money transfers
        soon.
      </Paragraph>
    ),
  },
  {
    question: "Is it safe to send money abroad?",
    answers: (
      <Paragraph $small>
        When using a reliable money transfer service which uses an international
        payment network, it is safe to send money abroad. It is also important
        that when sending money abroad, you know and trust the recipient. At SB
        Remit, we provide a secure way to send money abroad, with flexible
        delivery options, competitive exchange rates, and no hidden costs.
      </Paragraph>
    ),
  },
  {
    question: "How do I make a remit payment?",
    answers: (
      <Paragraph $small>
        A remit payment can be made through an electronic money transfer service
        and can be sent internationally. Remittance can be paid through SB
        Remit, a service which has zero transaction fees and multiple delivery
        options.
      </Paragraph>
    ),
  },
  {
    question: "What is the cheapest way to send money to Africa?",
    answers: (
      <Paragraph $small>
        The cheapest way to send money to Africa is through an international
        bank transfer.{" "}
        <Link to={paths.LANDING}>
          SB Remit can help you send money to Africa
        </Link>{" "}
        cheaply by offering the best exchange rates and zero transaction fees
        through a user-friendly and transparent financial service.{" "}
      </Paragraph>
    ),
  },
  {
    question: "What do money transfer services offer?",
    answers: (
      <Paragraph $small>
        Money transfer services offer a convenient method of transferring money
        internationally. Compared to other methods of internationally
        transferring money, a money transfer service allows for cheaper
        transaction fees, more competitive exchange rates, and increased
        delivery options - all through a clear and user-friendly platform.
      </Paragraph>
    ),
  },
  {
    question: "Are you a regulated money remittance company?",
    answers: (
      <Paragraph $small>
        SB Remit is a regulated money remittance company which prides itself on
        providing a user-friendly and transparent service, with zero transaction
        fees or hidden costs. In the United Kingdom, SB Remit is under the
        Financial Conduct Authority’s electronic money regulations for the
        provision of payment services.
      </Paragraph>
    ),
  },
  {
    question: "How do I securely send money to someone?",
    answers: (
      <Paragraph $small>
        An international bank transfer represents an excellent way to send money
        securely, as they are actioned through reliable international banking
        networks which connect financial institutions around the world. Through
        a{" "}
        <Link to={paths.ABOUT}>
          regulated money transfer service such as SB Remit
        </Link>
        , you can send money securely with a variety of delivery options and no
        hidden transaction fees.
      </Paragraph>
    ),
  },
];
