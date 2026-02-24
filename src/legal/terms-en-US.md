## 1. Acceptance of Terms

By accessing or using the Gimlee platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Platform. Your continued use of the Platform following the posting of changes to these Terms constitutes acceptance of those changes.

## 2. Platform Description

Gimlee is a decentralized, peer-to-peer (P2P) cryptocurrency marketplace that connects buyers and sellers for exchanging goods and services using cryptocurrency. The Platform uses a **non-custodial** payment verification model — sellers provide a read-only **viewing key**, allowing the Platform to verify payments on the blockchain without ever taking custody of funds.

Gimlee does not hold, manage, or transfer any cryptocurrency on behalf of its users. All payments occur directly between buyers and sellers on their respective blockchain networks.

## 3. User Accounts & Responsibilities

### 3.1 Registration
You must register an account to buy or sell on the Platform. You agree to provide accurate, current, and complete information during registration and to keep your account credentials secure.

### 3.2 Viewing Keys & Roles
To sell on the Platform, you must register a **viewing key** for at least one supported settlement cryptocurrency. Viewing keys grant the Platform read-only access to verify incoming payments. You are solely responsible for the security of your private keys and wallet credentials — the Platform never requests nor stores private spending keys.

Access to settlement currencies is gated by roles (e.g., registering a PirateChain viewing key grants the PIRATE role). You may only accept payments in currencies for which you hold the corresponding role.

### 3.3 User Spaces
Users may create personalized public profile pages ("Spaces") to showcase their ads and build reputation. You are solely responsible for the content you publish in your Space.

## 4. Marketplace Rules

### 4.1 Listings
Sellers may create advertisements ("Ads") for goods and services. All listings must comply with applicable laws and Platform guidelines. The Platform reserves the right to remove any listing that violates these Terms.

### 4.2 Prohibited Items
You may not list items that are illegal, fraudulent, counterfeit, or otherwise prohibited by applicable law. The Platform reserves the right to determine, at its sole discretion, what constitutes a prohibited item.

### 4.3 Transactions
All transactions are between the buyer and seller directly. The Platform facilitates discovery and payment verification but is not a party to any transaction. Buyers and sellers are solely responsible for fulfilling their respective obligations (delivery of goods, payment, etc.).

## 5. Payments & Settlement

### 5.1 Settlement Currencies
Buyers pay exclusively in supported settlement cryptocurrencies (currently: **ARRR** — PirateChain, **YEC** — Ycash). Sellers select which settlement currencies they accept per ad. At least one settlement currency must be accepted for an ad to be active.

### 5.2 Non-Custodial Model
The Platform does not hold funds at any point during a transaction. Payment verification is performed using the seller's viewing key, which provides read-only blockchain access. The Platform cannot move, freeze, or seize any cryptocurrency.

### 5.3 Exchange Rates
When currency conversion is required (e.g., for pegged-price ads), exchange rates are sourced from multiple external providers and updated frequently. The Platform does not guarantee the accuracy of exchange rates and is not liable for any losses arising from rate fluctuations between the time of purchase initiation and payment confirmation.

## 6. Ad Pricing & Automatic Trading Suspension

### 6.1 Pricing Modes
Gimlee supports two pricing modes for advertisements:

1. **Fixed Crypto Price:** The seller specifies an exact price in a cryptocurrency (e.g., 100 ARRR). The buyer pays this exact amount. The price does not adjust based on market conditions.

2. **Pegged (Reference) Price:** The seller specifies a price in a reference currency (e.g., 50 USD, 0.5 XAU). The buyer pays the market-rate equivalent in their chosen settlement cryptocurrency at the time of purchase. Exchange rates are sourced from multiple providers and updated frequently.

### 6.2 Volatility Protection (Pegged Pricing Only)
Sellers using *Pegged Pricing* may optionally enable "Volatility Protection." This feature is **not available** for ads using *Fixed Crypto Pricing*, as those sellers have accepted the inherent market risk.

### 6.3 Definitions
- **Protected Ad:** An ad using *Pegged Pricing* where the seller has explicitly enabled "Volatility Protection."
- **Significant Negative Volatility:** A condition where the market price of a settlement cryptocurrency drops by **5.0% or more** against USDT within a rolling **10-minute window**.
- **Stale Market Data:** A condition where the Platform has not received a valid exchange rate update for a cryptocurrency for more than **1 hour**.

### 6.4 Automatic Suspension
When the system detects *Significant Negative Volatility* or *Stale Market Data* for a settlement cryptocurrency:
1. All *Protected Ads* accepting that cryptocurrency have that specific payment method **frozen**.
2. The frozen payment method is disabled — buyers cannot purchase using the affected cryptocurrency.
3. If the ad accepts other non-affected settlement currencies, those remain fully available for purchase. The ad continues to be listed and purchasable via the unaffected currencies.
4. Only when **all** of an ad's accepted settlement currencies are simultaneously frozen does the ad become fully unpurchasable. Even in this case, the ad remains visible to buyers with a notification explaining the temporary suspension.

### 6.5 Cooldown & Recovery
- **Volatility:** Once the price stabilizes (drop < 5%), the system enters a mandatory **30-minute Cooldown Period**. Trading in the affected currency resumes only after the cooldown expires *and* stability is maintained.
- **Stale Data:** Trading resumes immediately once fresh exchange rate data is received.

### 6.6 Seller Override
Sellers may disable Volatility Protection for individual ads at any time, accepting the risk of selling at potentially unfavorable rates.

## 7. Intellectual Property

### 7.1 Platform Content
The Gimlee name and logo are trademarks of Gimlee. The Platform's source code is released under the MIT License — you are free to copy, modify, and distribute it in accordance with that license. User interface design elements and look & feel may be freely reused and adapted.

### 7.2 User Content
You retain ownership of content you upload (descriptions, images, etc.). By uploading content, you grant the Platform a non-exclusive, worldwide license to display, distribute, and promote your content in connection with the Platform's services.

### 7.3 Content Standards
All user-generated content is subject to sanitization and moderation. External images within descriptions are prohibited to prevent tracking and bandwidth abuse.

## 8. Limitation of Liability

### 8.1 No Custody Disclaimer
The Platform does not hold, manage, or have access to any user's cryptocurrency funds. The Platform is not liable for any loss of funds due to incorrect wallet addresses, blockchain network issues, or user error.

### 8.2 Market Risk
Cryptocurrency values are inherently volatile. The Platform is not responsible for any financial losses arising from market price fluctuations, whether or not the Volatility Protection is enabled.

### 8.3 Service Availability
The Platform is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free operation. The Platform shall not be liable for any damages arising from service interruptions, data loss, or system failures.

## 9. Dispute Resolution

As a peer-to-peer marketplace, the Platform acts as a facilitator, not a party to transactions. In the event of a dispute between a buyer and seller:
1. Parties are encouraged to resolve disputes directly through the Platform's messaging system.
2. The Platform may, at its discretion, provide mediation assistance but is under no obligation to do so.
3. The Platform is not liable for any losses, damages, or disputes arising from transactions between users.

## 10. Modifications to Terms

The Platform reserves the right to modify these Terms at any time. Material changes will be communicated through the Platform's notification system. Your continued use of the Platform after such changes constitutes acceptance of the modified Terms.