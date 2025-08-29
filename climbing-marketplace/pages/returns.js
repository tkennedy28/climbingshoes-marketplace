import Head from 'next/head';
import Link from 'next/link';

export default function Returns() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Refund Policy - Climbing Shoe Shop</title>
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/climbing-shoes" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <section className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">30-Day Return Guarantee</h2>
            <p className="text-gray-700">
              We want you to love your climbing shoes! If you&apos;re not completely satisfied with your purchase, you may return it within 30 days of delivery for a full refund or exchange.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Buyers</h2>
            <p className="text-gray-700 mb-2">The Climbing Shoe Shop will allow a refund request for an item if the item was never shipped by the seller, if the item recieved is not as described, or if it is damaged or lost during shipping. Only in these cases may a buyer request a refund."Not as described" only includes: gouges, stains, cracks, incorrect size, and sometimes color. Buyers are not eligible for refunds if they are unsatisfied with the item, only if there is an error as described above. The buyer must request a return or refund through The Climbing Shoe Shop by opening a dispute within 72 hours of receipt of the item (determined by the tracking information submitted by the seller). Buyers must respond to requests for documentation or information from The Climbing Shoe Shop witin 3 business days. Failure to do so will result in automatic cancellation of the dispute and resolution in favor of the seller.</p>
            <p className="text-gray-700 mb-2">Any claim for a refund must be accompaanied by a complete unboxing video that begins before the package is opened and shows a complete picture of the box being opened. The unboxing video must be submitted to The Climbing Shoe Shop by the buyer within the 72 hours refund period for a dispute to be eligible for submission. The buyer is responsible for recording and creating a video of the unopened box containing the item before it is opened, and throughout the opening process. A clear, uncut, and unaltered video of the entire unboxing process from before the box is opened to after the item is unwrapped is required to make any claim for a refund. Before commencing the unboxing video, the box must still be sealed as it was when it left the seller's possession. This video acts as your protection and proof that the item was damaged before it arrived to you. Any suspicion of tampering with the package (such as opening it and reclosing it) is grounds for dismissal of proof.</p>
            <p className="text-gray-700 mb-2">If the buyer provides incorrect shipping information, such as an inaccurate house number, zip code, apartment number, or fails to include an apartment number, and the package is subsequently lost, whether due to delivery to an incorrect address or loss during return to sender, the responsibility lies with the buyer. The Climbing Shoe Shop and the seller are not liable for issues arising from inaccurate shipment details provided by the buyer. If a package is successfully returned to the sender due to an incorrect address provided by the buyer and they choose not to have it re-shipped, the refund will be issued minus the original shipping fee, which will go to the seller to cover the initial shipment cost. If the buyer does want the item re-shipped, they will need to update and confirm their address, as well as cover the additional shipping costs for re-shipment.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Item Not As Described</h2>
            <p className="text-gray-700 mb-2">An item is not as described if the buyer can demonstrate that it is significantly different from the seller's listing description or photos. It is the seller's responsibility to fully disclose the condition of any item listed for sale on The Climbing Shoe Shop. This includes, but is not limited to, any visible known flaws such as stains, cracks, gouges, repairs, or any other imperfections. Being unsatisfied with an item is not a valid reason for a refund. Please note that listing photos alone do not satisfy the requirement to disclose these details; all such information must be clearly described in the listing's written description. Failure to accurately disclose an item's condition may result in a refund dispute and other penalties per our marketplace guidelines. These are a few examples of an item not as described:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>The item recieved is a different size, model, or color.</li>
              <li>The item has damaged that was not disclosed.</li>
              <li>The condition of the item is misrepresented (e.g., the item is described as new but is used).</li>
              <li>The buyer recieved the incorrect quantity of items.</li>
            </ul>
            <p className="text-gray-700 mb-2">The buyers refund from a dispute for an item not as described upon delivery will not be issued until the item is returned to the seller. The buyer will only recieve their refund once the item has been shipped back to the seller and is delivered to the proper return address as indicated by the seller. If an item is recieved not as described, and a return is warrented, the return shipping cost is paid by the seller. The seller has the option to allow the buyer to keep the item and still get a refund, if the seller decides they do not whish to recieve the item back from the buyer.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Payment for Shipping Costs for Refunds</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>If an item is deemed not as described, and the buyer requests a refund for the item, the seller is to pay the return shipping cost. The buyer will be refunded in full, minus the 2% buyer protection fee.</li>
              <li>If a package is refused/not signed for and successfully returned to the sender, the original shipping cost will be deducted from the buyer's original payment and sent to the seller.</li>
              <li>Under no circumstances should the seller request additional payment from the buyer to ship the item after the payment has been made, and the buyer is not required to pay any extra costs for shipping or any other service after the original payment has been made. Sellers must include all potentail shipping costs when making a listing.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Buyer Protection Fee Retention Scenarios</h2>
            <p className="text-gray-700 mb-2">Once we receive your return:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>If a buyer is being refunded for an item that arrived not as described, The Climbing Shoe Shop will refund your purchase in full, minus the 2% buyers protection fee.</li>
              <li>If a buyer is being refunded for an item that was lost in transit, The Climbing Shoe Shop will refund your purchase in full, minus the 2% buyers protection fee.</li>
              <li>If a buyer is being refunded for an item related to a non-delivery claim, and the seller opted out of a signature on delivery, The Climbing Shoe Shop will refund your purchase in full, minus the 2% buyers protection fee.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Partial Refunds</h2>
            <p className="text-gray-700">
              Partial Refunds Agreement
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>In cases where an item is not as decribed, both the buyer and seller have the option to negotiate and come to an agreement on a partial refund amount instead of initiating a full refund and return process.</li>
              <li>The partial refund amount should be based on the extent of the discrepancy and the impact on the item's value or usability.</li>
              <li>Both parties should communicate and reach a mutual agreement on the partial refund amount before proceeding with the refund process.</li>
              <li>The Climbing Shoe Shop is able to provide reccomendations on a reasonable partial refund amount based on a case by case basis. However, The Climbing Shoe Shop only provides recommendations for the buyer and seller to agree on a partial refund amount. The Climbing Shoe Shop will not force a certain amount for a partial refund. The Climbing Shoe Shop will ask both parties what they expect for a partial refund, and use those numbers as starting points to help the buyer and seller reach a mutual agreement.</li>
            </ul>
            <p className="text-gray-700">
              Refunds Process
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>If the buyer and seller agree on a partial refund amount, The Climbing Shoe Shop will subrtact the agreed upon partial refund amount from the original payout set to be recieved by the seller, minus the 2% buyer protection fee.</li>
              <li>The remaining payout amount will be issued to the seller, reflecting the partial refund deduction.</li>
            </ul>
            <p className="text-gray-700">
              Return of the Item
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>If a partial refund amount cannot be agreed upon by both parties, the item will be returned and the transaction will be refunded, with the return shipping costs paid by the seller, unless otherwise agreed upon between the parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Item Lost in Transit</h2>
            <p className="text-gray-700">
              Definition of Lost Package
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>A lost package refers to a shipment that has not been delivered within the expected timeframe and cannot be located by the shipping provider's tracking system.</li>
              <li>A package is considered lost if it has been in transit for longer than 14 days beyond the estimated delivery date provided by the shipping provider.</li>
            </ul>
            <p className="text-gray-700">
              Seller's Responsibility
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>If a package is deemed lost as per the defined criteria, it becomes the responsibility of the seller to take appropriate action.</li>
              <li>The seller should initiate a missing mail request with the corresponding shipping provider as soon as it becomes evident that the package is lost.</li>
              <li>The missing mail request should include all relevant information, such as tracking number, shipping details, and any supporting documentation required by the shipping provider.</li>
            </ul>
            <p className="text-gray-700">
              Resolution Process
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>After submitting the missing mail request, the seller should allow the shipping provider up to 72 hours to investigate and resolve the issue.</li>
              <li>If the shipping provider does not provide a resolution within the given timeframe, The Climbing Shoe Shop will proceed with issuing a refund to the buyer, and the seller should file an insurance claim with the shipping provider to recover lost funds.</li>
              <li>The insurance should cover the full amount paid by the buyer, including the item's cost and any associated shipping fees.</li>
            </ul>
            <p className="text-gray-700">
              Insurance Claim
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Following the refund to the buyer, the seller should initiate an insurance claim with the shipping provider, if applicable.</li>
              <li>This process aims to recover the financial loss incurred due to the lost package.</li>
              <li>The seller should provide any necessary information or documentation required to support the insurance claim, and The Climbing Shoe Shop will provide any additional information that may be needed.</li>
            </ul>
            <p className="text-gray-700">
              Delivered Item After Refund
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>In the event that a lost package is delivered to the buyer after the refund has been issued, the buyer is responsible for paying for the recieved item.</li>
              <li>Failure to reimburse the seller for the recieved item may result in a reconsideration of the users standing on The Climbing Shoe Shop.</li>
              <li>Consequences may include, but are not limited to, account suspension, limitations on future purchases, or other appropriate actions as determined by The Climbing Shoe Shop.</li>
            </ul>
            <ul className="text-gray-700">
                The Climbing Shoe Shop assumes no direct responsibility for packages lost during transit. However, we encourage sellers to promptly address lost package issues by following this policy and cooperating with the shipping provider to ensure satisfactory resolution for all parties involved.
            </ul>
            <ul className="text-gray-700">
                By using The Climbing Shoe Shop, buyers and sellers agree to comply with this lost package policy and understand the processes and responsibilities associated with resolving such incidents.
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Peer-to-Peer Marketplace Returns</h2>
            <p className="text-gray-700">
              For items purchased from individual sellers on our marketplace platform, returns are subject to the individual seller&apos;s return policy. We encourage all sellers to accept returns within 14 days, but policies may vary. Always check the seller&apos;s return policy before purchasing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">International Returns</h2>
            <p className="text-gray-700">
              International customers are responsible for return shipping costs. We recommend using a trackable shipping service. Import duties and taxes are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Return Shipping Costs</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Defective/Wrong Item:</strong> We cover all shipping costs</li>
              <li><strong>Change of Mind:</strong> Free returns on orders over $100, $8.95 return fee for orders under $100</li>
              <li><strong>International:</strong> Customer covers return shipping</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Size Guide & Fit Guarantee</h2>
            <p className="text-gray-700">
              Not sure about sizing? Check our comprehensive climbing shoe size guide before ordering. If the shoes don&apos;t fit as expected based on our guide, we&apos;ll cover the return shipping for an exchange.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Gift Returns</h2>
            <p className="text-gray-700">
              Items marked as gifts can be returned for store credit. The credit will be issued to the gift recipient via email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-gray-700">
              Have questions about returns? We&apos;re here to help!
              <br /><br />
              <strong>Email:</strong> returns@climbingshoeshop.com
              <br />
              <strong>Phone:</strong> 1-800-CLIMB-ON (Monday-Friday, 9am-5pm EST)
              <br />
              <strong>Live Chat:</strong> Available on our website during business hours
            </p>
          </section>

          <section className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
            <p className="text-gray-700">
              Climbing shoes should fit snugly but not painfully. They&apos;ll stretch about half a size with wear. If you&apos;re between sizes, consider the type of climbing you&apos;ll do most: tighter for sport/bouldering, more comfortable for all-day trad climbing.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}