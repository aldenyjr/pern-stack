import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

function ConfirmDeleteModal({ id, title, message }) {
  const { handleDelete } = useProductStore();

  const navigate = useNavigate();

  return (
    <dialog id="modal_delete_confirm_product" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="flex justify-between mt-4">
          <form method="dialog">
            <button className="btn btn-outline btn-error">Cancel</button>
          </form>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleDelete(id, navigate)}
          >
            Confirm
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ConfirmDeleteModal;
