
function Checkout() {
  return (
    <div class="flex justify-center items-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 class="text-2xl font-bold mb-6">CHECK OUT</h1>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-1">
            <div class="border p-6 rounded-lg mb-6">
              <h2 class="text-lg font-semibold mb-4">Shipping details</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium mb-1">First name</label>
                  <input type="text" class="w-full border border-1 border-gray-300 rounded-lg p-2" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Last name</label>
                  <input type="text" class="w-full border border-1 border-gray-300 rounded-lg p-2" />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Email address</label>
                  <input type="email" class="w-full border border-1 border-gray-300 rounded-lg p-2" placeholder="abc@gmail.com" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Phone</label>
                  <input type="text" class="w-full border border-1 border-gray-300 rounded-lg p-2" placeholder="(xxx) xx-xxxx" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Address</label>
                <input type="text" class="w-full border border-1 border-gray-300 rounded-lg p-2" />
              </div>
            </div>
            <div class="border p-4 rounded-lg mb-4 flex justify-between items-center">
              <span class="text-sm font-medium">Apply coupon</span>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="border p-4 rounded-lg flex justify-between items-center">
              <span class="text-sm font-medium">Shipping options</span>
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div class="w-full md:w-1/3">
            <div class="border p-6 rounded-lg">
              <h2 class="text-lg font-semibold mb-4">Order Details</h2>
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center">
                  <img src="https://placehold.co/50x50" alt="Product image" class="w-12 h-12 mr-4" />
                  <div>
                    <p class="text-sm">Crayon Shin-chan...</p>
                    <p class="text-sm">x1</p>
                  </div>
                </div>
                <p class="text-sm">80$</p>
              </div>
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center">
                  <img src="https://placehold.co/50x50" alt="Product image" class="w-12 h-12 mr-4" />
                  <div>
                    <p class="text-sm">Crayon Shin-chan...</p>
                    <p class="text-sm">x1</p>
                  </div>
                </div>
                <p class="text-sm">80$</p>
              </div>
              <div class="border-t pt-2">
                <div class="flex justify-between items-center mb-2">
                  <p class="text-sm">Total product value</p>
                  <p class="text-sm">80$</p>
                </div>
                <div class="flex justify-between items-center mb-2">
                  <p class="text-sm text-red-500">Discount</p>
                  <p class="text-sm text-red-500">-37$</p>
                </div>
                <div class="flex justify-between items-center mb-2">
                  <p class="text-sm">Tax</p>
                  <p class="text-sm">10$</p>
                </div>
                <div class="flex justify-between items-center mb-4">
                  <p class="text-sm">Shipping</p>
                  <p class="text-sm">10$</p>
                </div>
                <div class="flex justify-between items-center mb-4 border-t pt-2">
                  <p class="text-lg font-semibold">Total Price</p>
                  <p class="text-lg font-semibold">43$</p>
                </div>
                <button class="w-full bg-black text-white py-2 rounded-lg font-semibold">Pay now (2)</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
