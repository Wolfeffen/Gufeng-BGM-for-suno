# gufeng-bgm-composer

古风古建 BGM 作曲助手 / Guofeng Ancient-Architecture BGM Composer

一个面向 Codex 等 Agent 的 Skill，把“古建漫游画面需求”变成可直接粘贴的 Suno 纯音乐提示词。默认使用四类古风氛围原型；当需求提到具体地域或朝代时，只加入 1 到 3 个地域特征。

## Features / 特性

- 纯背景音乐，无歌词
- 四类原型：空山幽谷型、庙宇梵音型、旅途行进型、殿宇探秘型
- 地域/朝代调性：敦煌、苏州园林、泉州、福建土楼、拉萨、喀什等 34 个条目
- 女声吟唱统一写成“悠扬空灵的女声无词吟唱”，避免触发花腔炫技
- 附带 Suno 四字段提示词生成脚本

## Install / 安装

```text
npx skills add <owner>/gufeng-bgm-composer
```

或手动复制到：

- `~/.codex/skills/gufeng-bgm-composer`
- Windows: `C:\Users\<name>\.codex\skills\gufeng-bgm-composer`

## Usage / 使用

在 Codex 中直接说：

```text
使用 $gufeng-bgm-composer 为苏州园林做一首江南丝竹风格的古建 BGM。
```

或直接运行提示词生成脚本：

```powershell
node scripts/build-suno-prompt.js --archetype b --scene "古寺光影慢推" --region "敦煌" --mood "空灵、悠远、神秘" --vocal ethereal
```

## Structure / 结构

```text
gufeng-bgm-composer/
├── SKILL.md
├── agents/openai.yaml
├── references/
│   ├── style-profiles.md
│   ├── works-archive.md
│   ├── historical-regions.md
│   └── suno-prompt-guide.md
├── styles/gufeng-styles.json
└── scripts/build-suno-prompt.js
```

## License / 许可

MIT
