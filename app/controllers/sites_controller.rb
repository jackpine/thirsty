class SitesController < ApplicationController
  def index
    @sites = Site.order(:measurement_type).with_last_sampled_at
    respond_to do |format|
      format.html
      format.json { render :json => @sites }
    end
  end

  def show
    @site = Site.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render :json => @site.as_json(:include => :samples) }
    end
  end
end
