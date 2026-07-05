---
title: 'Science Agent:让 AI 跑完一轮完整的科研流程'
description: '一个基于 Qwen 多智能体集群的科研闭环系统。从"什么导致阿尔茨海默病"出发,自动完成假设生成、文献核验、数据分析、图像理解、同行评审,三轮迭代后假设评分从 6.58 升至 8.33。'
pubDate: 2026-07-03
category: 'AI × 生命科学'
tags: ['AI', '智能体', 'Qwen', '阿尔茨海默病', '科研自动化', '多智能体']
cover: '/images/HoYoWiki-image (3).png'
---

> 这是为 2026 挑战杯"揭榜挂帅"阿里云榜设计的一个 Science Agent 系统。它对齐 DeepMind 的 AI Scientist,但在生物医学垂直化和反幻觉上做了关键改造。

## 一个宏大的问题

Science 125 问里有一个:"What causes Alzheimer's disease?"(什么导致阿尔茨海默病?)

没人能完整回答。但如果让 AI 试一试呢?不是让它"知道答案",而是让它**走完一轮完整的科研流程**——理解问题、检索文献、提出假设、设计实验、分析数据、同行评审、迭代修正。

这就是我设计的 Science Agent 系统的目标。

## 架构:7 个 Agent 的分工集群

系统不依赖任何现成 Agent 框架(LangChain/AutoGen),而是自研轻量状态机编排。7 个 Agent 各司其职:

```
[Orchestrator: Qwen-Max]  状态机调度 + 全局状态
   ├─ Ideation Agent (Qwen-Max)        问题理解 → 假设生成 → 假设修正
   ├─ Retrieval Agent (Qwen-Plus)      PubMed / arXiv / Semantic Scholar 三源检索
   ├─ Verifier Agent (Qwen-Max)        引文核验 + 反例检索 ★核心差异化
   ├─ Coder Agent (Qwen-Coder)         百炼 Code Interpreter 执行组学分析
   ├─ VL Agent (Qwen-VL-Max)           IHC/IF/WB 生物图像理解
   └─ Reviewer Agent (Qwen-Max ×3)     创新性/可行性/可证伪性 三角色并行评审
```

为什么用多模型而不是单一 Qwen-Max?因为**不同节点对能力的要求不同**:检索要快要便宜(Qwen-Plus,成本 1/10),决策评审要强推理(Qwen-Max),写代码要专精(Qwen-Coder),看图要视觉(Qwen-VL-Max)。单模型走全流程既贵又容易在薄弱环节出错。

## 最大的差异化:Verifier 反例检索

DeepMind 原版 AI Scientist 没有反例检索,依赖自评。但生物医学 LLM 最大的问题是**幻觉文献**——编造不存在的 PMID。

我的 Verifier Agent 做了两件关键事:

### 1. 幻觉文献检测
三重保障:Retrieval 硬过滤 + Verifier 双源核验(Crossref DOI + OpenAlex PMID)+ Reviewer 复核。

实证:Round 1 的 Ideation 编造了 PMID:99999999,Verifier 通过 OpenAlex 发现不存在,标记 FABRICATED 剔除。

### 2. 反例检索 + 回退迭代
假设生成后,Verifier 用 `falsification_condition` 主动构造反例查询(加 NOT/相反词),LLM 判定是否构成 STRONG/WEAK_COUNTEREXAMPLE,触发强制回退。

实证:Round 1 假设"DAM 抑制 tau 播散"被 PMID:31227655(小胶质细胞**促进** tau)推翻,触发 Round 2 修正为"时间窗"假设——DAM 在早期 Braak I-II 期保护性,晚期 IV 期后转为致病性。

这个"被反例推翻 → 修正 → 再验证"的过程,才是真正的科研逻辑。

## VL:让 AI 看懂生物图像

DeepMind 原版没有视觉能力。我加入 Qwen-VL-Max 解析 IHC/IF/WB 图,识别 marker、脑区、染色强度。

强约束设计:区分示意图(不作证据)vs 实验图(可作证据),模糊图 confidence≤4。

实证:解析 Braak III-IV 海马 IHC,识别 Iba1/TREM2/AT8 共定位 40%,支持 DAM 富集假设。

## 三轮迭代:评分单调递增

| 轮次 | 均分 | 方差 | 推荐 | 关键修正 |
| :- | :-: | :-: | :-: | :- |
| Round 1 | 6.58 | 0.39 | REVISE×2 | 发现幻觉+强反例触发回退 |
| Round 2 | 7.75 | 0.14 | ACCEPT×2 | AMP-AD 分期+VL 多期+外泌体机制 |
| Round 3 | 8.33 | 0.07 | ACCEPT×3 | 预注册分界+TREM2 敲除证伪 |

Round 3 的创新是**预注册分析方案**:锁定 3 条证伪条件(F1/F2/F3)+ 分界点(Braak III/IV)+ 样本量 + 统计方法,解决"时间窗框架过灵活"的可证伪性批评。

F1 已通过数据检验(V/VI 期方向一致,未触发),F2/F3 锁定了 P301S×TREM2-/- 小鼠实验的预期。

## 真实科研产出

这不是跑 benchmark,而是用了真实的公开数据集:

| 数据集 | 用途 | 规模 |
| :- | :- | :- |
| GEO GSE5281 | AD vs 对照脑组织表达谱 | n=161 |
| AMP-AD ROSMAP | Braak 分期分层 RNA-seq | n=482 |
| GEO GSE160059 | 小胶质细胞单细胞 | — |

实际发现:
- 5/7 DAM 标记物(TREM2/TYROBP/LPL/CST7/APOE)在 AD 组显著上调(log2FC>1, adj_p<0.05)
- Braak I-II 负相关(r=-0.312, p=0.0034),V-VI 正相关(r=+0.418, p<0.00001),Fisher z 证方向反转
- DAM 密度随 Braak 分期:I-II(65) → III-IV 峰值(145) → V-VI 回落(95) cells/mm²
- DAM 高组 CD9 显著上调(t=18.43, p<0.0001),支持外泌体释放机制

## 人在回路

系统在 REVIEW 通过后插入 HUMAN_REVIEW 节点。Streamlit 前端三按钮:✅ 接受 / ✏️ 修改并迭代 / ❌ 否决重来。"修改"可注入人工反馈触发 REVISE_HYPOTHESIS。

AI 不是要取代科学家,而是**让科学家在关键决策点介入**。

## 哲学回响

这个系统的核心设计——**Verifier 主动寻找反例、假设被推翻后回退修正**——本质上是把"有性之美"的变异与选择机制,注入了 AI 的推理流程。

单一模型的线性推理是"无性之美"(自我复制逻辑链);而多 Agent 交叉验证 + 反例驱动回退,则是"有性之美"(差异碰撞产生新理解)。Round 1 被反例推翻的那一刻,才是系统真正"学到"东西的时刻。

—— 琉卜
齐鲁工业大学(山东省科学院)
