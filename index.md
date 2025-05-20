---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

{% for song in site.data.songs %}
    {% if song['Share in charts'] == 'FALSE' %}
       {% continue %}
    {% else %}
<article  id="{{ song.Name | url_encode }}" class="position-relative border rounded bg-body p-3 p-md-5 mb-3 mb-md-5">
<h1><span class="fw-bolder">{{ song.Name }}</span> <em class="fw-light">({{ song.Key }})</em></h1>
<ul class="list-unstyled d-flex">
<li class="position-absolute top-0 end-0">
    <a href="#{{ song.Name | url_encode }}" class="d-inline-block icon-link bg-info-subtle p-1" data-bs-toggle="tooltip" data-bs-title="Link to this song">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
            </svg>
        </span>
        <span class="d-none">Link to song chart</span>
    </a>
</li>
{% unless song.Recording == "" %}
<li class="list-inline-item mr-3">
    <a href="{{ song.Recording }}" class="d-inline-block" data-bs-toggle="tooltip" data-bs-title="Reference recording on YouTube" target="_blank">
        <span class="d-inline-block rounded-2 bg-danger p-1" style="height:24px"><img src="/assets/img/services/youtube.svg" class="d-block h-100" alt="Reference recording"></span>
        <span class="d-none">Reference recording</span>
    </a>
</li>
{% endunless %}
{% unless song.Feel == "" %}
<li class="list-inline-item"><strong>Feel</strong>: {{ song.Feel }}</li>
{% endunless %}
</ul>

<div class="fs-4 font-monospace">{{ song.Chart | newline_to_br }}</div>

{% unless song.Lyrics == "" %}
<details class="pt-4">
<summary class="fs-4 fw-medium mb-2">Arrangement with lyrics</summary>
{{ song.Lyrics | newline_to_br }}
</details>
{% endunless %}
</article>
    {% endif %}
{% endfor %}
