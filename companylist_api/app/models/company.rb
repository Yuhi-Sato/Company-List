class Company < ApplicationRecord
    has_many :accounts, dependent: :destroy
    has_many :memos, dependent: :destroy
end
