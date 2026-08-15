---
name: gufeng-bgm-composer
description: Create guofeng/gufeng pure instrumental BGM for ancient-architecture vlogs, travel films, and heritage-site walkthroughs. Use when the user wants Chinese traditional ambient background music, a Suno prompt for ethereal guofeng instrumentals, music for temples, gardens, grottoes, old towns, or historical sites, or revision of an existing guofeng track. Add subtle period and regional color only when the user names a place or dynasty; otherwise keep the default ambient guofeng archetypes.
---

# 古风古建 BGM 作曲助手

把古建漫游画面需求变成可直接粘贴的 Suno 音乐简报，并在试听后迭代。

## 工作流

1. 确认 Brief：场景/画面、情绪、速度、乐器、结构、时长。信息不足时使用默认值：庙宇空灵型、行板、洞箫加混响。
2. 选择原型：读取 `references/style-profiles.md`，从 A 空山幽谷型、B 庙宇梵音型、C 旅途行进型、D 殿宇探秘型中选择，或组合两个原型。
3. 地域/朝代倾斜：仅当需求提到具体地域、朝代或族群时，读取 `references/historical-regions.md`，在默认原型上加 1 到 3 个地域特征；未提到就不加。
4. 生成提示词：按“描述、风格、情绪、节奏”四字段输出，必须写明纯背景音乐、无歌词。需要脚本时运行：

```powershell
node scripts/build-suno-prompt.js --archetype b --scene "古寺光影慢推" --region "敦煌" --mood "空灵、悠远、神秘" --vocal ethereal
```

5. 交付简报：标题建议、Suno 提示词、结构说明、监听时重点检查的 1 到 2 个点。
6. 迭代：根据“迭代映射”修改参数并重新生成，一次只改一个方向。

## 提示词规则

- 描述字段写画面用途、纯音乐无歌词、段落结构和每段乐器/过渡。
- 风格字段用具体乐器与音色，控制在 50 到 120 词；不要堆抽象形容词。
- 情绪字段 2 到 4 个词，节奏字段写速度档位。
- 主奏乐器一次只给一个强方向，避免“洞箫和琵琶同时主奏”这类冲突。
- 出现女声吟唱时写“悠扬空灵的女声无词吟唱”，禁止只写“女高音”，避免触发花腔炫技；同时写明无歌词。
- 需求未提及地域/朝代时，不添加地域标签，按默认原型走；提及时只加 1 到 3 个地域特征。

## 四类原型速查

| 原型 | 默认速度 | 主奏 | 氛围 |
| --- | --- | --- | --- |
| A 空山幽谷型 | 散板/行板 | 洞箫、手碟 | 空灵、留白、山林 |
| B 庙宇梵音型 | 行板 | 洞箫/竹笛、女声吟唱 | 静谧、回音、庙宇 |
| C 旅途行进型 | 中板 | 竹笛/古琴、琵琶 | 律动、citypop、前进 |
| D 殿宇探秘型 | 中板偏缓 | 大鼓、古琴/琵琶 | 神秘、叙事、探索 |

## 迭代映射

- 更安静/太吵：删鼓点或标注极轻，减少乐器标签，加稀疏、留白、pad 铺底。
- 太满/太密：简化段落，减少同时演奏乐器，加长混响尾巴。
- 鼓点弱化：移除电鼓/大鼓，改为极轻手鼓或无鼓点。
- 更空灵：加大混响，增加悠扬空灵的女声吟唱或 pad，主奏换回洞箫/竹笛。
- 更有律动：加电鼓、citypop bass、琵琶扫弦，速度升一档。
- 更像某首作品：读取 `references/works-archive.md`，沿用对应作品的原型与标签。
- 太慢/太拖：行板升到中板，缩短开篇，提前进入第二段。
- 想更古：增加古琴、古筝、琵琶，减少合成器和电鼓。
- 女声太炫技/花腔：删掉“女高音/soprano”，改为悠扬空灵的女声无词吟唱，强调轻盈、气声、飘浮感。
- 地域味太重/像民俗大杂烩：只保留 1 到 2 个地域特征标签，主奏与结构回到默认原型。

## 资源

- 风格原型与乐器库：`references/style-profiles.md`
- 现有作品档案：`references/works-archive.md`
- 地域/朝代调性表：`references/historical-regions.md`
- Suno 输入规则：`references/suno-prompt-guide.md`
- 风格数据：`styles/gufeng-styles.json`
- 提示词生成脚本：`scripts/build-suno-prompt.js`
