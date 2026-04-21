import { CartItem } from '../types';

interface Props {
  item: CartItem;
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

const CartItemComponent = ({ item, onUpdateQuantity, onRemove }: Props) => {
  return (
    <div className="flex gap-4 py-6 border-b last:border-none">
      <img src={item.product.image} alt="" className="w-24 h-24 object-cover rounded-2xl" />
      <div className="flex-1">
        <h4 className="font-semibold">{item.product.name}</h4>
        <p className="text-sm text-gray-500">Size: {item.size} • Color: {item.color}</p>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex border rounded-2xl">
            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-4 py-2">-</button>
            <span className="px-4 py-2 font-medium">{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-4 py-2">+</button>
          </div>
          <button onClick={() => onRemove(item.id)} className="text-red-500 text-sm font-medium">Remove</button>
        </div>
      </div>
      <div className="text-right font-semibold">৳{parseFloat(item.product.final_price) * item.quantity}</div>
    </div>
  );
};

export default CartItemComponent;