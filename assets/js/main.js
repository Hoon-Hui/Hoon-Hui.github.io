
(function() {

	"use strict";

	var	$body = document.querySelector('body');

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Play initial animations on page load.
		window.addEventListener('load', function() {
			blockPC();
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});
	
	// Signup Form.
		(function() {

			// Vars.
				var $form = document.querySelectorAll('#signup-form')[0],
					$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
					$message;

			// Bail if addEventListener isn't supported.
				if (!('addEventListener' in $form))
					return;

			// Message.
				$message = document.createElement('span');
					$message.classList.add('message');
					$form.appendChild($message);

				$message._show = function(type, text) {

					$message.innerHTML = text;
					$message.classList.add(type);
					$message.classList.add('visible');

					window.setTimeout(function() {
						$message._hide();
					}, 3000);

				};

				$message._hide = function() {
					$message.classList.remove('visible');
				};

			// Events.
			// Note: If you're *not* using AJAX, get rid of this event listener.
				$form.addEventListener('submit', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Hide message.
						$message._hide();

					// Disable submit.
						$submit.disabled = true;

					// Process form.
					// Note: Doesn't actually do anything yet (other than report back with a "thank you"),
					// but there's enough here to piece together a working AJAX submission call that does.
						window.setTimeout(function() {

							// Reset form.
								$form.reset();

							// Enable submit.
								$submit.disabled = false;

							// Show message.
								//$message._show('success', 'Sorry. not the correct day..');
								//$message._show('failure', 'Something went wrong. Please try again.');

						}, 750);

				});
		})();


})();

function validateChk() {
	//if(document.getElementById('wedding').value==""){
		//location.href = "Hoon-Hui_Memories_eng.html";
		location.href = "/loveFrame/loveFrame_eng.html";
	//}
};

function validateChk_kor() {
	//if(document.getElementById('wedding').value==""){
		//location.href = "Hoon-Hui_Memories.html";
		location.href = "/loveFrame/loveFrame.html";
	//}
};

function validateChk_invitation() {
  if (window.innerWidth > window.innerHeight) {
    openAlert();
    return false;
  }
  location.href = "/invitation.html";
}

function openAlert() {
  document.getElementById('simple-alert').style.display = 'flex';
}

function closeAlert() {
  document.getElementById('simple-alert').style.display = 'none';
}

function blockPC() {
    // 1. User Agent 체크
    const ua = navigator.userAgent;
    const isMobileUA = /iPhone|iPad|iPod|Android/i.test(ua);

    // 2. 터치 이벤트 지원 여부 (PC는 일반적으로 false)
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 3. 화면 크기 및 방향 (모바일은 대개 가로보다 세로가 길거나 특정 해상도 이하)
    const isSmallScreen = window.innerWidth <= 1024; 

    // PC라고 판단되는 조건 (모바일 UA가 아니거나 터치를 지원하지 않을 때)
    if (!isMobileUA || !hasTouch) {
        alert("알림: 모바일 기기에서만 접속 가능합니다. 양해 부탁드립니다.");
        
        // 연결 실패 화면으로 즉시 교체
        document.documentElement.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; height:100vh; flex-direction:column;">
                <h1 style="color:Gray;">Access Denied</h1>
                <p>PC 접속이 감지되어 연결이 차단되었습니다.</p>
				<p>모바일 환경에서 접속 부탁 드립니다.</p>
				<p>감사합니다.</p>
                <button onclick="location.reload()">다시 시도</button>
            </div>
        `;
        throw new Error("PC Access Blocked"); // 이후 스크립트 실행 중단.
    }
};








