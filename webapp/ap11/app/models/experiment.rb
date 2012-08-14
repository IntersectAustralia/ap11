class Experiment < ActiveRecord::Base
  attr_accessible :date, :title, :user_id

  belongs_to :user

  validates :date,  :presence => true
  validates :title, :presence => true
end
