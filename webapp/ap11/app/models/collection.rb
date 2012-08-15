class Collection < ActiveRecord::Base
  attr_accessible :citation_info, :description, :for_codes, :name

  belongs_to :experiment
end
