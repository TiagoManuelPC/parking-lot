require 'bike_lot'

describe Bike_Lot do
subject(:bike_lot) {Bike_Lot.new}

it 'has spaces for bikes' do
expect(bike_lot.spaces).to eq []
end

end