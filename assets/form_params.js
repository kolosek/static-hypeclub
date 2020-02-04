var utm_params = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content'
];

function paramIsNotUtm(param) {
  return param.slice(0, 4) !== 'utm_';
}

function getParameterByName(name) {
  var url = new URL(window.location.href)
  return url.searchParams.get(name);
}

function setFormParameters($form) {
  utm_params.forEach(function(param) {
    var cValue = Cookies.get(param);
    $form.find('input[name='+ param + ']').val(cValue);
  });

  if(pix) {
    var email = $form.find('input[name=email]').val();
    pix('Lead', { email: email });
  }
}

utm_params.forEach(function(param) {
  var pValue = getParameterByName(param);
  if (pValue !== null && pValue !== undefined && pValue !== '') {
    Cookies.set(param, pValue);
  }
});

if (history && history.replaceState && location.search) {
  var params = location.search.slice(1).split('&');
  var newParams = params.filter(paramIsNotUtm);
  if (newParams.length < params.length) {
    var search = newParams.length ? '?' + newParams.join('&') : '';
    var url = location.pathname + search + location.hash;
    history.replaceState(null, null, url);
  }
}