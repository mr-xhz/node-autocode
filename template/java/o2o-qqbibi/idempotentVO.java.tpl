{{P(file)}}

import com.idohoo.o2o.common.idempotent.vo.BaseIdempotentVO;
{{P(file).replace("package","import").replace(".vo.in",".vo.dto."+U(data.table)+"VO" )}}

/**
 * @Description 代码自动生成,这个是给幂等用的
 * {{U(data.table)}}IdempotentVO
 *
 */
public class {{U(data.table)}}IdempotentVO extends BaseIdempotentVO{
    private static final long serialVersionUID = 1L;

    private {{U(data.table)+"VO"}} {{L(data.table)+"VO"}};

    public {{U(data.table)}}IdempotentVO({{U(data.table)+"VO"}} {{L(data.table)+"VO"}}){
    	this.{{L(data.table)+"VO"}} = {{L(data.table)+"VO"}};
    }

    public {{U(data.table)+"VO"}} get{{U(data.table)+"VO"}}() {
        return {{L(data.table)+"VO"}};
    }

    public void set{{U(data.table)+"VO"}}({{U(data.table)+"VO"}} {{L(data.table)+"VO"}}) {
        this.{{L(data.table)+"VO"}} = {{L(data.table)+"VO"}};
    }
}
