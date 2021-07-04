require 'car_lot'

describe Car_Lot do
subject(:car_lot) {Car_Lot.new}

it 'has spaces for cars' do
expect(car_lot.spaces).to eq []
end

it 'has a maximun capacity of 100' do
  expect(car_lot.capacity).to eq 100
end

end