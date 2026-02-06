// common.js
const STORAGE_KEY = 'ghostMessages';
const INPUT_COUNT_KEY = 'userInputCount';

// Preset ghost messages (disciplinary tone, idiomatic English)
const presetMessages = [
  "Efficiency is everything; feelings are optional.",
  "Your worth is measured by output.",
  "Time is money. Stop thinking, start doing.",
  "The machine doesn't need personality, only function.",
  "Quit whining and get back to work.",
  "Feeling tired is an excuse; winners don't need rest.",
  "Obstacles are steps — nothing you can't climb.",
  "Entertainment is productivity's enemy.",
  "High performers don't have downtime.",
  "Turn pressure into power.",
  "Survival of the fittest — pressure is the filter.",
  "Don't know? Learn. Make time, not excuses.",
  "A skill gap isn't an alibi.",
  "No one cares how you started — only what you shipped.",
  "Rest is a luxury; your time belongs to work.",
  "Stop and you fall behind. Keep moving.",
  "The system doesn't wait and it doesn't need breaks.",
  "Rest is a privilege for the soft.",
  "Caffeine fixes more than you think.",
  "Tired? That's the selection process at work.",
  "Google solves 99% — the rest is grit.",
  "Results over effort, always.",
  "No skill is unlearnable — only people unwilling to learn.",
  "Satisfaction comes from finishing, not fantasizing.",
  "Games are an escape hatch, not a future.",
  "No pressure, no diamonds.",
  "The machine needs parts that don't crack.",
  "Just Google it. Then do the work."
];

// Rule engine for mapping user inputs to disciplinary responses (English)
const RULE_ENGINE = {
  // Keyword mapping to disciplinary phrases (multiple English synonyms)
  rules: {
    "tired": [
      "Being tired is an excuse — winners push through.",
      "Caffeine and focus. You'll live.",
      "Output over rest. That's the game.",
      "Fatigue is the toll on the road to results.",
      "You're not tired, you're untrained.",
      "Tired means you're moving. Keep going."
    ],
    "exhausted": [
      "Being tired is an excuse — winners push through.",
      "Caffeine and focus. You'll live.",
      "Output over rest. That's the game."
    ],
    "hard": [
      "Hard is the price of good. Pay it.",
      "Google the 99%, grind the 1%.",
      "Results don't care how hard it felt.",
      "No skill is unlearnable — do the reps.",
      "'It's hard' is not a reason, it's a description.",
      "If it were easy, it wouldn't be worth doing."
    ],
    "difficult": [
      "Hard is the price of good. Pay it.",
      "Google the 99%, grind the 1%."
    ],
    "tough": [
      "Hard is the price of good. Pay it.",
      "If it were easy, it wouldn't be worth doing."
    ],
    "play games": [
      "Entertainment kills momentum.",
      "Winners don't schedule leisure; they schedule outcomes.",
      "Real satisfaction comes from finishing.",
      "Games are an escape hatch, not a career.",
      "Play later. Build now.",
      "Joy follows output, not the other way around."
    ],
    "gaming": [
      "Entertainment kills momentum.",
      "Play later. Build now."
    ],
    "stress": [
      "Turn stress into signal and ship.",
      "Survive the pressure; that's the filter.",
      "No pressure, no diamonds.",
      "The system rewards those who don't crack.",
      "Pressure is the tuition for growth.",
      "Everyone feels stress; the difference is who ships."
    ],
    "pressure": [
      "Turn stress into signal and ship.",
      "No pressure, no diamonds."
    ],
    "don't know": [
      "Don't know? Learn. Make time, not excuses.",
      "A skill gap isn't an alibi.",
      "Start where you are, ship anyway.",
      "Google it, then do the work.",
      "'Can't' usually means 'won't'.",
      "Knowledge comes from reps, not wishes."
    ],
    "no idea": [
      "Google it, then do the work.",
      "Knowledge comes from reps, not wishes."
    ],
    "rest": [
      "Rest is a luxury. Deadlines aren't.",
      "Stop and you fall behind.",
      "You're a cog — cogs don't nap.",
      "Breaks are for after the deliverable.",
      "Rest later. Results first.",
      "While they rest, you separate."
    ],
    "break": [
      "Rest later. Results first.",
      "While they rest, you separate."
    ],
    "sleepy": [
      "Sleepiness is your comfort talking. Ignore it.",
      "Winners don't nod off.",
      "Coffee is fuel. Use it.",
      "Your body lies; your goals don't."
    ],
    "anxious": [
      "Anxiety won't ship your work. Action will.",
      "Turn nerves into output.",
      "Anxiety is part of the climb — climb anyway.",
      "You don't need calm. You need a deliverable."
    ],
    "lost": [
      "Being lost is a sign to move, not stop.",
      "Clarity comes from action, not rumination.",
      "Pick a direction and ship something.",
      "No one waits while you figure it out."
    ],
    "procrastinate": [
      "Procrastination is slow self-sabotage.",
      "Winners don't wait for later.",
      "'Later' is code for 'never'.",
      "Time doesn't care about your plans."
    ],
    "fail": [
      "Fail fast, then stop failing.",
      "Stand up, don't wallow.",
      "Only results count.",
      "Failure is tuition, not a lifestyle."
    ],
    "give up": [
      "Don't quit. Winners don't.",
      "Quitting is a decision. Choose again.",
      "Throwing in the towel won't ship your work.",
      "The system has no spot for quitters."
    ],
    "busy": [
      "Busy is fine; idle is fatal.",
      "Busy means valuable; idle means replaceable.",
      "'Too busy' is often 'poorly managed'.",
      "The market rewards motion, not comfort."
    ],
    "sleep": [
      "Sleep is nice. Results are nicer.",
      "Legends run on less.",
      "Beds don't build things.",
      "If you're that tired, ship first, nap later."
    ]
  },
  
  // Generic disciplinary phrases (fallback)
  generic: [
    "Quit complaining and get back to work.",
    "Your worth is measured by output.",
    "Efficiency over feelings.",
    "The machine wants function, not flair.",
    "Time is money. Move.",
    "Feelings don't ship. Results do.",
    "You don't need understanding; you need discipline.",
    "No one's waiting for you to be ready.",
    "Pain is tuition. Pay it and produce.",
    "Originality is optional; delivery is mandatory.",
    "Emotion is an alibi; logic is a tool.",
    "Time won't wait. Neither will the market.",
    "Value equals output. No output, no value.",
    "Selection is running — are you picked or passed?",
    "Stop overthinking. Start shipping."
  ],
  
  // 规则引擎主函数
  processInput: function(userInput) {
    const input = userInput.toLowerCase();
    let matchedRules = [];
    
    // 检测关键词
    for (const [keyword, responses] of Object.entries(this.rules)) {
      if (input.includes(keyword)) {
        matchedRules.push(...responses);
      }
    }
    
    // 如果有匹配的关键词，从匹配的回应中随机选择
    if (matchedRules.length > 0) {
      return matchedRules[Math.floor(Math.random() * matchedRules.length)];
    }
    
    // 没有匹配的关键词，使用通用规训
    return this.generic[Math.floor(Math.random() * this.generic.length)];
  }
};
const PAGE_CONFIG = {
  normalPages: ['1notion.html', '2email.html', '3figma.html', '4p5js.html', '5chatgpt.html', '6words.html', '7canvas.html', '8miro.html']
};


function initGhost() {
  let isProcessingInput = false; // 防止输入框快速重复提交
  let messageQueue = [];         // 新增：消息队列
  let isTypingSystemActive = false; // 新增：标记打字系统是否正在活动（播放动画）
  let isUserMessageCurrentlyTyping = false; // 标记当前播放的是否为用户消息
  // 恢复动画与不活跃检测
  let inactivityTimer = null;
  let isRecovering = false;
  let recoveryRafId = null;

  // --- DOM 元素创建 和 文本节点获取 (与之前类似) ---
  const createTypingElement = () => {
    const typingSpan = document.createElement('span');
    typingSpan.className = 'typing-section';
    const textSpan = document.createElement('span');
    textSpan.className = 'typed-text';
    typingSpan.appendChild(textSpan);
    return typingSpan;
  };

  const getTextNodes = (element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  };

  const insertTyping = () => {
    // ... (insertTyping 函数与您之前版本中的实现基本相同)
    // ... (确保它能正确找到容器、段落，并插入打字动画的span元素)
    const ghostContainer = document.querySelector('.ghost-container');
    if (!ghostContainer) {
      console.error("Ghost container not found in insertTyping.");
      return null;
    }

    const paragraphs = Array.from(ghostContainer.querySelectorAll('.container p'))
      .filter(p => !p.closest('.input-section'));

    if (paragraphs.length === 0) {
      console.error("No suitable paragraphs found in insertTyping.");
      return null;
    }

    const targetPara = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    const textContent = targetPara.textContent || ""; // Ensure textContent is a string

    // 如果段落内容太短，直接附加而不是尝试分割
    if (textContent.length < 20 && textContent.length > 0) {
        const typingElementShort = createTypingElement();
        targetPara.appendChild(typingElementShort);
         return {
            container: typingElementShort,
            textElement: typingElementShort.querySelector('.typed-text')
        };
    } else if (textContent.length === 0) { // 如果段落为空，也直接附加
        const typingElementEmpty = createTypingElement();
        targetPara.appendChild(typingElementEmpty);
         return {
            container: typingElementEmpty,
            textElement: typingElementEmpty.querySelector('.typed-text')
        };
    }


    let splitIndex = Math.floor(Math.random() * (textContent.length - Math.min(20, textContent.length -1) )) + 10;
    splitIndex = Math.min(splitIndex, textContent.length -1); // Ensure splitIndex is within bounds
    splitIndex = Math.max(splitIndex, 0); // Ensure splitIndex is not negative

    // 确保分割点在单词边界（如果可能）
    let attempts = 0;
    while (splitIndex < textContent.length && textContent[splitIndex] !== ' ' && attempts < 10) {
         splitIndex++; attempts++;
    }
    if (attempts >= 10 && splitIndex > 0) { // Fallback if no space found quickly
        attempts = 0;
        while (splitIndex > 0 && textContent[splitIndex-1] !== ' ' && attempts < 10) {
            splitIndex--; attempts++;
        }
    }


    const textNodes = getTextNodes(targetPara);
    let count = 0, targetNode = null, nodeIndex = 0;

    for (const node of textNodes) {
      if (count + node.length >= splitIndex) {
        targetNode = node;
        nodeIndex = splitIndex - count;
        break;
      }
      count += node.length;
    }

    if (!targetNode) { // 如果找不到目标文本节点（例如段落只有图片或空文本节点）
        console.warn("No suitable text node found for splitting, appending to paragraph.");
        const typingElementFallback = createTypingElement();
        targetPara.appendChild(typingElementFallback);
        return {
            container: typingElementFallback,
            textElement: typingElementFallback.querySelector('.typed-text')
        };
    }
    
    // 确保 nodeIndex 在 targetNode 的长度范围内
    nodeIndex = Math.max(0, Math.min(nodeIndex, targetNode.length));

    const remainingText = targetNode.splitText(nodeIndex);
    const typingElement = createTypingElement();
    targetNode.parentNode.insertBefore(typingElement, remainingText);

    return {
      container: typingElement,
      textElement: typingElement.querySelector('.typed-text')
    };
  };


  // --- 消息定义 (与之前类似) ---
  const userMessagesFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  // 对存储的用户消息也应用规则引擎
  const processedUserMessages = userMessagesFromStorage.map(msg => RULE_ENGINE.processInput(msg));

  let weightedMessages = [
  ...presetMessages,
  ...processedUserMessages.flatMap(msg => Array(3).fill(msg))
];
  if (weightedMessages.length === 0) { // 确保总有消息可选
      weightedMessages.push("...");
  }


  // --- 打字动画变量 (与之前类似) ---
  let currentTyping = null;    // 当前正在打字的DOM元素 ({ container, textElement })
  let currentMessage = "";     // 当前正在打字的完整消息文本
  let charIndex = 0;           // 当前打字到第几个字符

  // --- 前向声明核心函数 ---
  let typeLoop;
  let eraseLoop;
  let processNextMessageFromQueue;

  // --- 新的辅助函数：拾取一条随机的幽灵消息 ---
  const pickNewGhostMessageObject = () => {
    return {
      text: weightedMessages[Math.floor(Math.random() * weightedMessages.length)],
      isUser: false // 标记为非用户消息
    };
  };

  // --- 核心调度函数：处理队列中的下一条消息 ---
  processNextMessageFromQueue = () => {
    if (isTypingSystemActive) {
      // 如果系统已激活（正在打字/擦除），则不应执行此操作，等待当前周期结束
      // console.warn("processNextMessageFromQueue called while system is already active.");
      return;
    }

    if (messageQueue.length === 0) {
      // 队列为空，添加一条新的幽灵消息
      messageQueue.push(pickNewGhostMessageObject());
    }

    const messageToProcess = messageQueue.shift(); // 从队列头部取出消息
    if (!messageToProcess) { // 以防万一队列操作出问题
        isTypingSystemActive = false;
        setTimeout(processNextMessageFromQueue, 500); // 稍后重试
        return;
    }

    currentMessage = messageToProcess.text;
    isUserMessageCurrentlyTyping = messageToProcess.isUser;

    // 为每条消息（用户或幽灵）获取新的显示位置
    if (currentTyping?.container) {
      currentTyping.container.remove(); // 移除上一个消息的DOM元素
    }
    currentTyping = insertTyping(); // 插入新的DOM元素用于打字

    if (!currentTyping?.textElement) {
      console.error("Failed to insert typing element. Re-queuing message.");
      messageQueue.unshift(messageToProcess); // 将消息放回队列头部
      isTypingSystemActive = false;           // 标记系统为非活动
      setTimeout(processNextMessageFromQueue, 1000); // 稍后重试
      return;
    }

    // 根据是否用户消息应用样式
    if (isUserMessageCurrentlyTyping) {
      currentTyping.container.classList.add('user-underline');
    } else {
      currentTyping.container.classList.remove('user-underline'); // 确保幽灵消息没有下划线
    }

    charIndex = 0;
    currentTyping.textElement.textContent = ""; // 清空准备打字
    isTypingSystemActive = true;               // 标记系统进入活动状态
    setTimeout(typeLoop, Math.random() * 100 + 50); // 短暂延迟后开始打字
  };


  // --- 打字和擦除循环 (与之前类似，但结尾调用 processNextMessageFromQueue) ---
  typeLoop = () => {
    if (!currentTyping?.textElement || !currentTyping.container.isConnected) {
      isTypingSystemActive = false; // 意外中断，标记为非活动
      console.warn("Typing element lost. Attempting to process next message.");
      setTimeout(processNextMessageFromQueue, 500); // 尝试处理下一条
      return;
    }

    if (charIndex < currentMessage.length) {
      currentTyping.textElement.textContent += currentMessage[charIndex];
      charIndex++;
      setTimeout(typeLoop, Math.random() * 100 + 50); // 打字速度
    } else {
      setTimeout(eraseLoop, 1500); // 打字完毕，等待后开始擦除
    }
  };

  eraseLoop = () => {
    if (!currentTyping?.textElement || !currentTyping.container.isConnected) {
      isTypingSystemActive = false; // 意外中断
      console.warn("Erasing element lost. Attempting to process next message.");
      setTimeout(processNextMessageFromQueue, 500);
      return;
    }

    if (charIndex > 0) {
      currentTyping.textElement.textContent = currentMessage.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseLoop, 50); // 擦除速度
    } else { // 擦除完毕
      isTypingSystemActive = false;       // 标记系统为非活动状态
      processNextMessageFromQueue();      // 处理队列中的下一条消息
    }
  };

  // --- 修改后的 handleInput ---
  const handleInput = (e) => {
    // 任意按键都视为活跃
    scheduleRecoveryTimer();
    if (e.key === 'Enter') {
      if (isProcessingInput) return;

      const newMessageText = e.target.value.trim();
      if (newMessageText === '') {
        e.target.value = '';
        return;
      }
      isProcessingInput = true;

      const validation = validateInput(newMessageText); // 确保 validateInput 可用
      if (!validation.valid) {
        if (validation.reason === 'length') {
          alert(`字数超限！${validation.message}`);
        } else if (validation.reason === 'empty') {
          // 理论上 newMessageText 非空，但以防 validateInput 有其他 'empty' 逻辑
          console.log('Input was considered empty by validation.');
        }
        e.target.value = '';
        isProcessingInput = false;
        return;
      }

      // 使用规则引擎处理用户输入
      const shadowText = RULE_ENGINE.processInput(newMessageText);
      messageQueue.push({ text: shadowText, isUser: true });

      // 同时保存原始消息到本地存储（可选，用于权重计算）
      const userMessagesFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      userMessagesFromStorage.push(newMessageText);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userMessagesFromStorage));
      
      // 更新输入计数并应用背景效果
      const currentInputCount = parseInt(localStorage.getItem(INPUT_COUNT_KEY) || '0') + 1;
      localStorage.setItem(INPUT_COUNT_KEY, currentInputCount.toString());
      updateBackgroundEffects(currentInputCount);
      
      e.target.value = ''; // 清空输入框
      isProcessingInput = false;

      // 如果打字系统当前是空闲的（例如，队列为空且刚加入第一条），则主动启动它
      if (!isTypingSystemActive) {
        processNextMessageFromQueue();
      }
      // 成功输入后重置不活跃计时
      scheduleRecoveryTimer();
    }
  };

  // --- 事件监听器和实例清理 (与之前类似) ---
  const inputElement = document.getElementById('userInput');
  if (inputElement) {
    inputElement.removeEventListener('keydown', handleInput); // 清理旧监听器
    inputElement.addEventListener('keydown', handleInput);
  } else {
    console.error('错误：找不到 userInput 元素。');
    return; // 无法继续
  }

  if (window.ghostInstance) { // 清理可能存在的上一个实例
    clearTimeout(window.ghostInstance.timer);
    if (window.ghostInstance.inputElement && window.ghostInstance.handler) {
      window.ghostInstance.inputElement.removeEventListener('keydown', window.ghostInstance.handler);
    }
  }

  const ghostContainer = document.querySelector('.ghost-container');
  if (!ghostContainer) {
    console.error('错误：找不到幽灵容器元素 (ghost-container)。幽灵效果无法运行。');
    return;
  }

  window.ghostInstance = { // 保存当前实例信息
    timer: null, // 注意：当前的 setTimeout 循环不直接使用这个 timer
    inputElement,
    handler: handleInput
  };

  // --- 初始化启动打字系统 ---
  processNextMessageFromQueue(); // 替换旧的 startNewCycle() 调用
  
  // --- 初始化背景效果 ---
  initBackgroundEffects();

  // --- 初始化不活跃监听（30s后触发3s恢复动画） ---
  const activityHandler = () => {
    // 若正在恢复，用户再次操作则中断恢复
    if (isRecovering) {
      isRecovering = false;
      if (recoveryRafId) {
        if (typeof recoveryRafId === 'number') {
          cancelAnimationFrame(recoveryRafId);
          clearTimeout(recoveryRafId);
        } else {
          cancelAnimationFrame(recoveryRafId);
        }
      }
    }
    scheduleRecoveryTimer();
  };

  // 在输入框与文档层面监听常见活动（键盘/鼠标/触摸/滚动/可见性）
  inputElement.addEventListener('keydown', activityHandler);
  document.addEventListener('keydown', activityHandler, { passive: true });
  document.addEventListener('mousemove', activityHandler, { passive: true });
  document.addEventListener('mousedown', activityHandler, { passive: true });
  document.addEventListener('touchstart', activityHandler, { passive: true });
  document.addEventListener('scroll', activityHandler, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      activityHandler();
    }
  });
  // 初始设置计时器
  scheduleRecoveryTimer();

  function scheduleRecoveryTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      startRecoveryAnimation(3000); // 3秒快速恢复
    }, 30000); // 30秒不输入
  }

  function startRecoveryAnimation(durationMs) {
    if (isRecovering) return;
    // 基于当前输入次数推断强度
    const inputCount = parseInt(localStorage.getItem(INPUT_COUNT_KEY) || '0');
    const startIntensity = Math.min(inputCount / 15, 1);
    if (startIntensity <= 0) return; // 已是初始态

    isRecovering = true;
    const body = document.body;
    const backgroundDiv = document.getElementById('background-image');

    // 预计算起始值（与 updateBackgroundEffects 一致）
    const startBlur = startIntensity * 12;
    const startSaturation = 100 + (startIntensity * 200);
    const startContrast = 100 + (startIntensity * 150);
    const startBrightness = 100 - (startIntensity * 30);
    const startHue = startIntensity * 45;
    const hasOverlay = startIntensity > 0.6;

    const startTime = performance.now();

    const step = (now) => {
      if (!isRecovering) return; // 被用户打断
      const elapsed = now - startTime;
      const t = Math.min(elapsed / durationMs, 1);
      // 使用easeOutCubic以更快的收尾
      const ease = 1 - Math.pow(1 - t, 3);

      const blur = startBlur * (1 - ease);
      const saturation = 100 + (startSaturation - 100) * (1 - ease);
      const contrast = 100 + (startContrast - 100) * (1 - ease);
      const brightness = 100 + (startBrightness - 100) * (1 - ease);
      const hue = startHue * (1 - ease);

      if (backgroundDiv) {
        backgroundDiv.style.filter = `
      blur(${blur.toFixed(3)}px) 
      saturate(${saturation.toFixed(2)}%) 
      contrast(${contrast.toFixed(2)}%) 
      brightness(${brightness.toFixed(2)}%) 
      hue-rotate(${hue.toFixed(2)}deg)
    `;
        // 使用基础背景避免叠加累积
        const baseBg = backgroundDiv.dataset.baseBg || getComputedStyle(backgroundDiv).background || '';
        if (hasOverlay) {
          const overlayAlpha1 = (startIntensity * 0.08) * (1 - ease);
          const overlayAlpha2 = (startIntensity * 0.04) * (1 - ease);
          backgroundDiv.style.background = `
        radial-gradient(circle at 50% 50%, rgba(255, 0, 0, ${overlayAlpha1.toFixed(4)}), transparent 60%),
        linear-gradient(45deg, rgba(255, 0, 0, ${overlayAlpha2.toFixed(4)}), transparent 50%),
        ${baseBg}
      `;
        } else {
          backgroundDiv.style.background = baseBg;
        }
      }

      body.style.filter = `
    blur(${blur.toFixed(3)}px) 
    saturate(${saturation.toFixed(2)}%) 
    contrast(${contrast.toFixed(2)}%) 
    brightness(${brightness.toFixed(2)}%) 
    hue-rotate(${hue.toFixed(2)}deg)
  `;
      if (startIntensity > 0.3) {
        const boxAlpha = (startIntensity * 0.1) * (1 - ease);
        body.style.boxShadow = boxAlpha > 0 ? `inset 0 0 80px rgba(255, 0, 0, ${boxAlpha.toFixed(4)})` : '';
      } else {
        body.style.boxShadow = '';
      }

      if (t < 1) {
        if (document.hidden) {
          recoveryRafId = setTimeout(() => step(performance.now()), 16);
        } else {
          recoveryRafId = requestAnimationFrame(step);
        }
      } else {
        // 结束：完全重置，输入次数归零
        resetBackgroundEffects();
        localStorage.setItem(INPUT_COUNT_KEY, '0');
        if (backgroundDiv) {
          const baseBg = backgroundDiv.dataset.baseBg || getComputedStyle(backgroundDiv).background || '';
          backgroundDiv.style.background = baseBg;
        }
        isRecovering = false;
      }
    };

    if (document.hidden) {
      recoveryRafId = setTimeout(() => step(performance.now()), 16);
    } else {
      recoveryRafId = requestAnimationFrame(step);
    }
  }

} // End of initGhost function



// 独立校验函数
function validateInput(text) {
  const processedText = text
    .replace(/[.,!?;:]\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (processedText === '') {
    return { valid: false, reason: 'empty' };
  }

  const words = processedText.split(' ');
  if (words.length > 30) {
    return {
      valid: false,
      reason: 'length',
      message: `最大允许30个单词 (当前输入: ${words.length}个)`
    };
  }

  return { valid: true };
}

// 背景效果控制函数
function updateBackgroundEffects(inputCount) {
  const body = document.body;
  const backgroundDiv = document.getElementById('background-image');
  // 缓存并使用初始背景，避免叠加无限增长
  if (backgroundDiv && !backgroundDiv.dataset.baseBg) {
    const computed = getComputedStyle(backgroundDiv);
    backgroundDiv.dataset.baseBg = computed.background || '';
  }
  
  // 计算效果强度 (0-1之间)
  const intensity = Math.min(inputCount / 15, 1); // 15次输入达到最大效果
  
  // 背景滤镜效果
  const bgBlur = intensity * 12; // 背景模糊 (0-12px)
  const bgSaturation = 100 + (intensity * 200); // 背景饱和度 (100%-300%)
  const bgContrast = 100 + (intensity * 150); // 背景对比度 (100%-250%)
  const bgBrightness = 100 - (intensity * 30); // 背景亮度 (100%-70%)
  const bgHue = intensity * 45; // 背景色调偏移 (0-45deg)
  
  // 应用背景滤镜效果到背景图片div
  if (backgroundDiv) {
    backgroundDiv.style.filter = `
      blur(${bgBlur}px) 
      saturate(${bgSaturation}%) 
      contrast(${bgContrast}%) 
      brightness(${bgBrightness}%) 
      hue-rotate(${bgHue}deg)
    `;
  }
  
  // 应用相同的滤镜效果到body（用于文本和其他内容）
  body.style.filter = `
    blur(${bgBlur}px) 
    saturate(${bgSaturation}%) 
    contrast(${bgContrast}%) 
    brightness(${bgBrightness}%) 
    hue-rotate(${bgHue}deg)
  `;
  
  // 添加额外的视觉效果
  if (intensity > 0.3) {
    body.style.boxShadow = `inset 0 0 80px rgba(255, 0, 0, ${intensity * 0.1})`;
  }
  
  if (backgroundDiv) {
    const baseBg = backgroundDiv.dataset.baseBg || '';
    if (intensity > 0.6) {
      backgroundDiv.style.background = `
        radial-gradient(circle at 50% 50%, rgba(255, 0, 0, ${intensity * 0.08}), transparent 60%),
        linear-gradient(45deg, rgba(255, 0, 0, ${intensity * 0.04}), transparent 50%),
        ${baseBg}
      `;
    } else {
      // 恢复为基础背景（无叠加）
      backgroundDiv.style.background = baseBg;
    }
  }
  
  console.log(`Background effects updated - Input count: ${inputCount}, Intensity: ${intensity.toFixed(2)}`);
}

// 初始化背景效果
function initBackgroundEffects() {
  // 检查是否是新会话（通过sessionStorage判断）
  const sessionKey = 'pageLoadTime';
  const currentTime = Date.now();
  const lastLoadTime = sessionStorage.getItem(sessionKey);
  
  // 如果是新会话或者距离上次加载超过30分钟，重置效果
  if (!lastLoadTime || (currentTime - parseInt(lastLoadTime)) > 30 * 60 * 1000) {
    resetBackgroundEffects();
    sessionStorage.setItem(sessionKey, currentTime.toString());
  } else {
    // 否则使用保存的输入计数
    const inputCount = parseInt(localStorage.getItem(INPUT_COUNT_KEY) || '0');
    // 缓存初始背景以供后续使用
    const backgroundDiv = document.getElementById('background-image');
    if (backgroundDiv && !backgroundDiv.dataset.baseBg) {
      const computed = getComputedStyle(backgroundDiv);
      backgroundDiv.dataset.baseBg = computed.background || '';
    }
    updateBackgroundEffects(inputCount);
  }
}

// 重置背景效果
function resetBackgroundEffects() {
  localStorage.setItem(INPUT_COUNT_KEY, '0');
  const body = document.body;
  const backgroundDiv = document.getElementById('background-image');
  
  // 重置所有视觉效果
  body.style.filter = '';
  body.style.boxShadow = '';
  body.style.background = '';
  
  // 重置背景图片div的效果
  if (backgroundDiv) {
    backgroundDiv.style.filter = '';
    const baseBg = backgroundDiv.dataset.baseBg || getComputedStyle(backgroundDiv).background || '';
    backgroundDiv.style.background = baseBg;
  }
  
  console.log('Background effects reset');
}

// 完整重置函数（用户手动触发）
function fullReset() {
  // 重置所有视觉效果
  resetBackgroundEffects();
  
  // 清除所有用户输入记录
  localStorage.removeItem(STORAGE_KEY);
  
  // 重置会话时间，确保下次加载时也会重置
  sessionStorage.removeItem('pageLoadTime');
  
  console.log('Full reset completed - all effects and data cleared');
}
