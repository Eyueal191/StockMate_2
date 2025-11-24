import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import InventoryRowCard from "../../../../components/cards/InventoryRowCard.jsx";
import { StockContext } from "../../../../stockContext/StockContext.jsx";
import Loading from "../../../../components/Loading.jsx";

function ItemsList() {
  const products = useSelector((state) => state.items.list) || [];
  const { refetchItemsList } = useContext(StockContext);

  useEffect(() => {
    refetchItemsList();
  }, [refetchItemsList]);

  if (products.length === 0) return <Loading />;

  return (
    <div className="p-4">
      {/* Scrollable list container with persistent vertical scrollbar */}
      <div className="overflow-y-scroll overflow-x-scroll max-h-[80vh] flex flex-col gap-2 px-2 sm:px-4 py-2 w-auto">
        {products.map((product) => (
          <InventoryRowCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ItemsList;
