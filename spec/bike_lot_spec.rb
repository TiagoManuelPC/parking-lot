require 'bike_lot'

describe Bike_Lot do
subject(:bike_lot) {Bike_Lot.new}

it 'has spaces for bikes' do
expect(bike_lot.spaces).to eq []
end

it 'has a maximun capacity of 20' do
  expect(bike_lot.capacity).to eq 20
end
end