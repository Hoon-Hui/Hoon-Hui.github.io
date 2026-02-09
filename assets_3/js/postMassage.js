document.addEventListener('DOMContentLoaded', () => {
						const main = document.querySelector('#main');

						/*
						main.addEventListener('scroll', test, { passive: true });
						
						function test(e) {
						  console.log('main 스크롤 중');
						  console.log(main.scrollTop); // 세로 스크롤 위치
						}
						*/

						function notify() {
						  const top = main.scrollTop;
				
						  window.top.postMessage(
						    {
						      type: 'IFRAME_SCROLL',
						      top
						    },
						    '*'
						  );
						}
						
						// 최초 1회
						notify();

						main.addEventListener('scroll', notify, { passive: true });
					
				});
