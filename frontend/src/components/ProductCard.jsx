import { Link } from "react-router-dom";
import { EditIcon, Trash2Icon } from "lucide-react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

function ProductCard({ product }) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%]">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={product.image}
          alt={product.name}
        />
      </figure>
      {/* PRODUCT INFO */}
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">
          R$ {Number(product.price).toFixed(2).replace(".", ",")}
        </p>
        <ConfirmDeleteModal
          title="Confirm delete product?"
          message="Are you sure you want to delete this product?"
          id={product.id}
        />

        {/* CARD ACTION */}
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-sm btn-info btn-outline"
          >
            <EditIcon className="size-4" />
          </Link>

          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() =>
              document
                .getElementById("modal_delete_confirm_product")
                .showModal()
            }
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
