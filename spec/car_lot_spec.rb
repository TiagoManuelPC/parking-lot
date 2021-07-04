require 'car_lot'

describe Car_Lot do
subject(:car_lot) {Car_Lot.new}

it 'has spaces for cars' do
expect(car_lot.spaces).to eq []
end

end