const Resume = () => {
  return (
    <div className='flex items-center justify-center w-full h-fit bg-gray-50'>
      <div className='w-full h-fit text-gray-800 p-8 font-serif max-w-4xl px-auto'>
        {/* 头部信息 */}
        <div className='bg-white rounded-2xl border p-8 mb-8'>
          <h1 className='text-4xl font-bold text-blue-600 mb-2'>杨开元</h1>
          <div className='flex flex-col md:flex-row gap-2 text-gray-600 mb-4'>
            <span>男｜2001年2月6日｜24岁｜中共党员</span>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-500 hover:text-blue-600 transition-colors'>
            <a href='tel:15953837986' className='flex items-center gap-2'>
              📞 15953837986
            </a>
            <a href='mailto:mr.yky@qq.com' className='flex items-center gap-2'>
              ✉️ mr.yky@qq.com
            </a>
            <a
              href='https://github.com/MrYKY'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2'>
              👨💻 github.com/MrYKY
            </a>
            <a
              href='https://ikyan.cn'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2'>
              🌐ikyan.cn
            </a>
          </div>
        </div>

        {/* 内容区块 */}
        <div className='space-y-8'>
          {/* 个人总结 */}
          <Section title='个人总结'>
            <p className='leading-relaxed text-gray-700'>
              本人专业学习内容广泛且多样化，勇于探索新兴技术领域，具备快速学习与实践能力。在快手实习期间，成功实现从游戏开发领域向大模型领域的转型。拥抱AI时代，相信技术工作者应在AI的辅助下，专注于发展更高层次的体系化思维和工程思维，而不应过于纠结技术细节。
            </p>
          </Section>

          {/* 教育背景 */}
          <Section title='教育背景'>
            <TimelineItem
              time='2023.09-至今'
              title='北京大学'
              subtitle='软件与微电子学院｜电子信息｜新兴交叉学科方向'
            />
            <TimelineItem
              time='2019.09-2023.06'
              title='厦门大学'
              subtitle='航空航天学院｜自动化专业｜工学学士'
            />
          </Section>

          {/* 技术能力 */}
          <Section title='技术能力'>
            <div className='flex flex-col gap-4'>
              <SkillCategory
                title='编程语言'
                items={['Python (主力)', 'C++', 'JavaScript']}
              />
              <SkillCategory
                title='机器学习框架'
                items={[
                  'PyTorch',
                  'Hugging Face Transformers',
                  'Swift（训练框架）'
                ]}
              />
              <SkillCategory
                title='AI辅助工作'
                items={[
                  '熟练使用各类AI工具提升工作效率',
                  '具备清晰的AI能力边界认知'
                ]}
              />
              <SkillCategory
                title='领域知识'
                items={[
                  'Transformer架构',
                  'SFT',
                  '深度学习',
                  '经典论文精读',
                  '前沿论文关注'
                ]}
              />
              <SkillCategory
                title='其他技能'
                items={[
                  'Linux',
                  'Git',
                  'UE5',
                  '图形学',
                  'Next.js',
                  'Blender',
                  'Stable Diffusion'
                ]}
              />
            </div>
          </Section>

          {/* 实习经历 */}
          <Section title='实习经历'>
            <ExperienceItem
              company='北京快手科技有限公司'
              department='大模型与多媒体技术部'
              time='2024年6月-2025年2月'
              projects={[
                {
                  name: '全双工语音交互系统（FlexDuo）',
                  points: [
                    '参与系统核心模块设计以及训练，提出以Idle状态为核心的语音识别优化方案，对标SOTA模型，通过深度定制训练策略提升对话连贯性，最终误打断率降低24.9%，响应准确率提升7.6%',
                    '辅助系统落地：辅助双工语音交互系统接入200万+粉丝数字人主播“关小芳”直播间，并实时连麦互动',
                    '独立负责数据处理和测试程序：设计多模态数据预处理流水线（音频分帧/文本清洗），通过GPT清洗提升数据质量，处理超1000小时音频数据及2万条高质量文本对话数据。针对全新的评价指标对模型性能进行测试'
                  ]
                },
                {
                  name: '3D数字人智能体“关小芳”',
                  points: [
                    '基于UE5引擎开发虚拟人交互逻辑，集成DLSS技术解决渲染粘连模糊问题，并大幅提高帧率',
                    '设计VAD&ASR流水线方案，优化语音交互端到端延迟（ASR环节平均延时降低30%），支撑智能体实时反馈能力'
                  ]
                }
              ]}
            />
          </Section>

          {/* 项目经验 */}
          <Section title='项目经验'>
            <ProjectItem
              name='个人网站'
              period='2024年12月-持续迭代中'
              techStack={[
                'Notion',
                'Next.js',
                'React',
                'TailwindCSS',
                'Vercel'
              ]}
              links={[
                { label: '访问地址', url: 'https://ikyan.cn' },
                {
                  label: '基于NotionNext修改',
                  url: 'https://github.com/tangly1024/NotionNext'
                }
              ]}
              points={['基于开源项目NotionNext进行深度修改定制']}
            />

            <ProjectItem
              name='FlexDuo论文'
              period='2025年1月-2025年2月'
              techStack={['ACL在投', '核心贡献者']}
              links={[
                { label: '论文链接', url: 'https://arxiv.org/abs/2502.13472' }
              ]}
              points={[
                '一个模块化的全双工控制系统，以状态机为核心，旨在解决噪声干扰和系统耦合过紧的问题',
                '负责论文的数据处理和部分实验，以及部分论文编写'
              ]}
            />

            <ProjectItem
              name='I Am Happier Than You'
              period='2024年3月'
              techStack={['UE5 C++', '游戏Demo']}
              links={[
                {
                  label: 'GitHub仓库',
                  url: 'https://github.com/MrYKY/Two-player-2D-UE5-Cpp-Game'
                }
              ]}
              points={[
                '2D双人本地回合制策略游戏，独立完成从游戏设计、系统架构到程序编写的全过程',
                '最终形成可正常游玩的完整原型'
              ]}
            />
          </Section>

          {/* 其他信息 */}
          <Section title='其他信息'>
            <div className='space-y-2'>
              <InfoItem
                title='外语能力'
                content='英语 CET-6｜考研英语一86分｜无障碍阅读英文材料/技术文档'
              />
              <InfoItem
                title='沟通合作能力'
                content='本科阶段担任班长｜研究生阶段担任班长兼团支书'
              />
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

// ================= 辅助组件 =================
const Section = ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className='space-y-4'>
    <SectionTitle title={title} />
    <div className='bg-white rounded-2xl border p-8'>{children}</div>
  </div>
)

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className='text-2xl font-bold text-blue-600 border-l-4 border-blue-500 pl-4'>
    {title}
  </h2>
)

const TimelineItem = ({
  time,
  title,
  subtitle
}: {
  time: string
  title: string
  subtitle: string
}) => (
  <div className='relative pl-10 ml-4 pb-6 border-l-2 border-blue-100'>
    <div className='absolute left-0 top-2 w-4 h-4 bg-blue-500 rounded-full -ml-[9px]' />
    <div className='text-sm text-gray-500 mb-1'>{time}</div>
    <h3 className='text-lg font-semibold'>{title}</h3>
    <p className='text-gray-600'>{subtitle}</p>
  </div>
)

const SkillCategory = ({
  title,
  items
}: {
  title: string
  items: string[]
}) => (
  <div className=''>
    <h4 className='font-medium text-blue-600'>{title}</h4>
    <div className='flex flex-wrap gap-4'>
      {items.map((item, i) => (
        <div
          key={i}
          className="text-gray-600 before:content-['•'] before:text-blue-400 before:mr-2 w-fit">
          {item}
        </div>
      ))}
    </div>
  </div>
)

const ExperienceItem = ({
  company,
  department,
  time,
  projects
}: {
  company: string
  department: string
  time: string
  projects: Array<{ name: string; points: string[] }>
}) => (
  <div className='space-y-6'>
    <div className='border-l-4 border-blue-500 pl-4'>
      <h3 className='text-xl font-semibold'>{company}</h3>
      <div className='text-gray-600'>{department}</div>
      <div className='text-sm text-gray-500'>{time}</div>
    </div>

    <div className='space-y-4 pl-2'>
      {projects.map((project, i) => (
        <div key={i} className='space-y-2'>
          <h4 className='font-medium text-blue-600'>{project.name}</h4>
          <ul className='space-y-2 list-disc pl-6 text-gray-700'>
            {project.points.map((point, j) => (
              <li key={j}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)

const ProjectItem = ({
  name,
  period,
  techStack,
  links,
  points
}: {
  name: string
  period: string
  techStack: string[]
  links: Array<{ label: string; url: string }>
  points: string[]
}) => (
  <div className='space-y-4 pb-6 mb-6 border-b last:border-b-0 border-gray-100 last:pb-0'>
    <div className='flex flex-col md:flex-row justify-between'>
      <h3 className='text-lg font-semibold'>{name}</h3>
      <div className='text-sm text-gray-500'>{period}</div>
    </div>

    <div className='flex flex-wrap gap-2'>
      {techStack.map((tech, i) => (
        <span
          key={i}
          className='px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm'>
          {tech}
        </span>
      ))}
    </div>

    <div className='flex flex-wrap gap-4'>
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 hover:text-blue-600 flex items-center gap-1'>
          <span>{link.label}</span>
          <ExternalLinkIcon className='w-4 h-4' />
        </a>
      ))}
    </div>

    <ul className='space-y-2 list-disc pl-6 text-gray-700'>
      {points.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
  </div>
)

const InfoItem = ({ title, content }: { title: string; content: string }) => (
  <div className='flex gap-4'>
    <div className='w-24 shrink-0 font-medium text-blue-600'>{title}</div>
    <div className='flex-1 text-gray-700'>{content}</div>
  </div>
)

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
    />
  </svg>
)

export default Resume
