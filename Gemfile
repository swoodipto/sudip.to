source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
gem "jekyll", "~> 4.3.0"

# Required for Ruby 3.4 and later
gem "csv"
gem "logger"
gem "base64"
gem "bigdecimal"

# This is the default theme for new Jekyll sites.
gem "minima", "~> 2.5"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-redirect-from", "~> 0.16"
  gem "jekyll-sass-converter", "~> 2.0"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Required for Ruby 3.0 and later
gem "webrick", "~> 1.8" 