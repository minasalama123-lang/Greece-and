export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-ink">Products</h1>
      <p className="mt-2 font-sans text-base text-clay">
        Add new pieces, choose their category, and remove old ones.
      </p>
      <div className="mt-10 border border-dashed border-sand bg-bone/60 p-6">
        <p className="font-sans text-sm text-clay">
          Coming in the next step — connect Supabase to enable adding and
          deleting products.
        </p>
      </div>
    </div>
  );
}
