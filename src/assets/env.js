(function (window) {
    window.__env = window.__env || {};
  
    // API url    
    window.__env.apiUrl = '{{ env('APPURL') }}';
  
  }(this));