{{P(file)}}

import java.util.List;

import org.lsmy.cloud.common.exception.CloudBaseRuntimeException;
import org.lsmy.cloud.common.mybatis.Page;
import org.lsmy.cloud.common.vo.PageResult;
{{P(file).replace("package","import").replace("service.impl","po."+U(data.table))}}
{{P(file).replace("package","import").replace("service.impl","po."+U(data.table)+"Example")}}
{{P(file).replace("package","import").replace("service.impl","vo."+U(data.table)+"VO")}}
{{P(file).replace("package","import").replace("service.impl","vo.svo."+U(data.table)+"SearchVO")}}
{{P(file).replace("package","import").replace("service.impl","service."+U(data.table)+"Service")}}
{{P(file).replace("package","import").replace("service.impl","dao."+(ext.subProject?ext.subProject+'.':'')+U(data.table)+"MapperDao")}}
{{P(file).replace("package","import").replace("service.impl","helper."+U(data.table)+"Helper")}}

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("{{H(data.table)}}Service")
public class {{U(data.table)}}ServiceImpl implements {{U(data.table)}}Service
{
    private static Logger logger = LoggerFactory.getLogger({{U(data.table)}}ServiceImpl.class);

    @Autowired
    private {{U(data.table)}}MapperDao {{H(data.table)}}MapperDao;

    /**
     * @description 根据条件做搜索
     * @param svo
     * @return
     * @lastModifier
     */
    @Override
    public PageResult list({{U(data.table)}}SearchVO svo) throws CloudBaseRuntimeException{
        PageResult result = new PageResult();
        Page page = new Page(svo.getPage_no(),svo.getPage_size());

        {{U(data.table)}}Example example = new {{U(data.table)}}Example();
        {{U(data.table)}}Example.Criteria criteria = example.createCriteria();
        example.setPage(page);

        List<{{U(data.table)}}VO> list = {{U(data.table)}}Helper.convertToVO({{H(data.table)}}MapperDao.selectByExample(example));

        result.setList(list);
        result.setCount({{H(data.table)}}MapperDao.countByExample(example));
        return result;
    }


    /**
     * @description 根据主键获取
     * @param svo
     * @return
     * @lastModifier
     */
    @Override
    public {{U(data.table)}}VO get({{data.priField.JavaType.type}} {{data.priField.Field}}) throws CloudBaseRuntimeException{
        {{U(data.table)}}VO vo = {{U(data.table)}}Helper.convertToVO({{H(data.table)}}MapperDao.get({{data.priField.Field}}));

        return vo;
    }

    /**
     * @description 插入
     * @param vo
     * @return
     * @lastModifier
     */
    @Override
    public void insert({{U(data.table)}}VO vo) throws CloudBaseRuntimeException{
        {{U(data.table)}} po = {{U(data.table)}}Helper.convertToPO(vo);
        {{H(data.table)}}MapperDao.insert(po);
    }

    /**
     * @description 批量插入
     * @param list
     * @return
     * @lastModifier
     */
    @Override
    public void insertList(List<{{U(data.table)}}VO> list) throws CloudBaseRuntimeException{
        List<{{U(data.table)}}> listPO = {{U(data.table)}}Helper.convertToPO(list);
        {{H(data.table)}}MapperDao.insertList(listPO);
    }

    /**
     * @description 更新
     * @param vo
     * @return
     * @lastModifier
     */
    @Override
    public void update({{U(data.table)}}VO vo) throws CloudBaseRuntimeException{
        {{U(data.table)}} po = {{U(data.table)}}Helper.convertToPO(vo);

        {{H(data.table)}}MapperDao.update(po);
    }

    /**
     * @description 批量更新
     * @param list
     * @return
     * @lastModifier
     */
    @Override
    public void updateList(List<{{U(data.table)}}VO> list) throws CloudBaseRuntimeException{
        List<{{U(data.table)}}> listPO = {{U(data.table)}}Helper.convertToPO(list);

        {{H(data.table)}}MapperDao.updateList(listPO);
    }

    /**
     * @description 删除
     * @param {{data.priField.Field}}
     * @return
     * @lastModifier
     */
    @Override
    public void delete({{data.priField.JavaType.type}} {{data.priField.Field}}) throws CloudBaseRuntimeException{
        {{H(data.table)}}MapperDao.delete({{data.priField.Field}});
    }

    /**
     * @description 批量删除
     * @param list
     * @return
     * @lastModifier
     */
    @Override
    public void deleteList(List<{{data.priField.JavaType.type}}> list) throws CloudBaseRuntimeException{
        {{H(data.table)}}MapperDao.deleteList(list);
    }
}
