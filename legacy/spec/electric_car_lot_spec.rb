require 'electric_car_lot'

describe Electric_Car_Lot do
subject(:electric_car_lot) {Electric_Car_Lot.new}

it 'has spaces for electric_cars' do
expect(electric_car_lot.spaces).to eq []
end

it 'has a maximun capacity of 15' do
  expect(electric_car_lot.capacity).to eq 15
end

end