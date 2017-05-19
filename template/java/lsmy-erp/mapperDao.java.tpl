{{P(file)}}

{{P(file).replace("package","import").replace("dao"+(ext.subProject?"."+ext.subProject:""),"po."+U(data.table)+"Example")}}
{{P(file).replace("package","import").replace("dao"+(ext.subProject?"."+ext.subProject:""),"po."+U(data.table))}}

import java.util.List;
import org.lsmy.cloud.{{ext.project}}.mapper.autocode.{{U(data.table)}}Mapper;
import org.lsmy.cloud.{{ext.project}}.mapper.custom.{{U(data.table)}}CustomDao;
import org.springframework.stereotype.Component;

@Component
public class {{U(data.table)}}MapperDao{

    private {{U(data.table)}}Mapper {{H(data.table)}}Mapper;

    private {{U(data.table)}}CustomDao {{H(data.table)}}CustomDao;

    public List<{{U(data.table)}}> selectByExample({{U(data.table)}}Example example){
        return {{H(data.table)}}Mapper.selectByExample(example);
    }

    public int countByExample({{U(data.table)}}Example example){
        return {{H(data.table)}}Mapper.countByExample(example);
    }

    public void insert({{U(data.table)}} po){
        {{H(data.table)}}Mapper.insertSelective(po);
    }

    public void insertList(List<{{U(data.table)}}> list){
        {{H(data.table)}}CustomDao.insertList(list);
    }

    public void update({{U(data.table)}} po){
        {{H(data.table)}}Mapper.updateByPrimaryKeySelective(po);
    }

    public void updateList(List<{{U(data.table)}}> list){
        {{H(data.table)}}CustomDao.updateList(list);
    }

    public int delete({{data.priField.JavaType.type}} {{data.priField.Field}}){
        return {{H(data.table)}}Mapper.deleteByPrimaryKey({{data.priField.Field}});
    }

    public int deleteList(List<{{data.priField.JavaType.type}}> list){
        {{U(data.table)}}Example example = new {{U(data.table)}}Example();
        example.createCriteria().and{{FU(data.priField.Field)}}In(list);
        return {{H(data.table)}}Mapper.deleteByExample(example);
    }

    public {{U(data.table)}} get({{data.priField.JavaType.type}} {{data.priField.Field}}){
        return {{H(data.table)}}Mapper.selectByPrimaryKey({{data.priField.Field}});
    }
}
