# encoding: utf-8
#
# Jekyll tag page generator.
#
# A generator that creates tag pages for octopress. Largely based
# on the category_generator.rb in this source.
#
# Available _config.yml settings :
# - tag_dir:          The subfolder to build tag pages in (default is 'tags').
# - tag_title_prefix: The string used before the tag in the page title (default Post tagged ")
# - tag_title_suffix: The string used after the tag in the page title (default is ")

module Jekyll

  # The TagIndex class creates a single tag page.
  class TagIndex < Page

    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir  = dir
      @name = 'index.html'
      self.process(@name)
      # Read the YAML data from the layout page.
      self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
      self.data['tag'] = tag
      # Set the title for this page.
      title_prefix             = site.config['tag_title_prefix'] || 'Tagged &ldquo;'
      title_suffix             = site.config['tag_title_suffix'] || '&rdquo;'
      self.data['title']       = "#{title_prefix}#{tag}#{title_suffix}"
      # Set the meta-description for this page.
      meta_description_prefix  = site.config['tag_meta_description_prefix'] || 'Tag: '
      self.data['description'] = "#{meta_description_prefix}#{tag}"
    end

  end

  # The TagFeed class creates an Atom feed for the specified tag.
  class TagFeed < Page

    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir  = dir
      @name = 'atom.xml'
      self.process(@name)
      # Read the YAML data from the layout page.
      self.read_yaml(File.join(base, '_includes/custom'), 'tag_feed.xml')
      self.data['tag']    = tag
      # Set the title for this page.
      title_prefix             = site.config['tag_title_prefix'] || 'Tagged &ldquo;'
      title_suffix             = site.config['tag_title_suffix'] || '&rdquo;'
      self.data['title']       = "#{title_prefix}#{tag}#{title_suffix}"
      # Set the meta-description for this page.
      meta_description_prefix  = site.config['tag_meta_description_prefix'] || 'Tag: '
      self.data['description'] = "#{meta_description_prefix}#{tag}"
      # Set the correct feed URL.
      self.data['feed_url'] = "#{dir}/#{name}"
    end

  end

  # The Site class is a built-in Jekyll class with access to global site config information.
  class Site

    # Creates an instance of TagIndex for each tag page, renders it, and
    # writes the output to a file.
    def write_tag_index(dir, tag)
      index = TagIndex.new(self, self.source, dir, tag)
      index.render(self.layouts, site_payload)
      index.write(self.dest)
      # Record the fact that this page has been added, otherwise Site::cleanup will remove it.
      self.pages << index

      # Create an Atom-feed for each index.
      feed = TagFeed.new(self, self.source, dir, tag)
      feed.render(self.layouts, site_payload)
      feed.write(self.dest)
      # Record the fact that this page has been added, otherwise Site::cleanup will remove it.
      self.pages << feed
    end

    # Loops through the list of tag pages and processes each one.
    def write_tag_indexes
      if self.layouts.key? 'tag_index'
        dir = self.config['tag_dir'] || 'tags'
        self.tags.keys.each do |tag|
          self.write_tag_index(File.join(dir, tag.gsub(/_|\P{Word}/, '-').gsub(/-{2,}/, '-').downcase), tag)
        end

      # Throw an exception if the layout couldn't be found.
      else
        throw "No 'tag_index' layout found."
      end
    end

  end


  # Jekyll hook - the generate method is called by jekyll, and generates all of the category pages.
  class GenerateCategories < Generator
    safe true
    priority :low

    def generate(site)
      site.write_tag_indexes
    end

  end

end

